/* globals: bluesky interactions script */
/* jshint esversion: 6 */
(function () {
  'use strict';

  var container = document.getElementById('bluesky-interactions');
  if (!container) return;

  var config = window.BSKY_INTERACTIONS;
  if (!config || !Array.isArray(config.urls) || config.urls.length === 0) return;

  var postUrls = config.urls;
  var condensedView = config.condensed === true;
  var BSKY_API = 'https://public.api.bsky.app/xrpc';

  /* ---- Utility helpers ---- */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function timeAgo(dateStr) {
    var date = new Date(dateStr);
    var now = new Date();
    var diffMs = now - date;
    var diffSecs = Math.floor(diffMs / 1000);
    var diffMins = Math.floor(diffSecs / 60);
    var diffHours = Math.floor(diffMins / 60);
    var diffDays = Math.floor(diffHours / 24);
    if (diffDays > 30) return date.toLocaleDateString();
    if (diffDays > 0) return diffDays + 'd ago';
    if (diffHours > 0) return diffHours + 'h ago';
    if (diffMins > 0) return diffMins + 'm ago';
    return 'just now';
  }

  function parseBskyUrl(url) {
    var match = url.match(/bsky\.app\/profile\/([^/?#]+)\/post\/([a-zA-Z0-9]+)/);
    if (!match) return null;
    return { handle: match[1], rkey: match[2] };
  }

  function fetchJson(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }

  /* ---- Bluesky API helpers ---- */

  function resolveHandle(handle) {
    if (handle.indexOf('did:') === 0) return Promise.resolve(handle);
    return fetchJson(
      BSKY_API + '/com.atproto.identity.resolveHandle?handle=' + encodeURIComponent(handle)
    ).then(function (data) { return data.did; });
  }

  function fetchAllLikes(uri) {
    var likes = [];
    function page(cursor) {
      var url = BSKY_API + '/app.bsky.feed.getLikes?uri=' + encodeURIComponent(uri) + '&limit=100';
      if (cursor) url += '&cursor=' + encodeURIComponent(cursor);
      return fetchJson(url).then(function (data) {
        var batch = data.likes || [];
        likes = likes.concat(batch);
        if (data.cursor && batch.length === 100) return page(data.cursor);
        return likes;
      });
    }
    return page(null).catch(function () { return likes; });
  }

  function fetchThread(uri) {
    return fetchJson(
      BSKY_API + '/app.bsky.feed.getPostThread?uri=' + encodeURIComponent(uri) + '&depth=6&parentHeight=0'
    ).catch(function () { return null; });
  }

  function fetchAllQuotes(uri) {
    var quotes = [];
    function page(cursor) {
      var url = BSKY_API + '/app.bsky.feed.getQuotes?uri=' + encodeURIComponent(uri) + '&limit=100';
      if (cursor) url += '&cursor=' + encodeURIComponent(cursor);
      return fetchJson(url).then(function (data) {
        var batch = data.feed || [];
        quotes = quotes.concat(batch);
        if (data.cursor && batch.length === 100) return page(data.cursor);
        return quotes;
      });
    }
    return page(null).catch(function () { return quotes; });
  }

  /* ---- Data loading ---- */

  function loadPostData(url) {
    var parsed = parseBskyUrl(url);
    if (!parsed) return Promise.resolve(null);

    return resolveHandle(parsed.handle).then(function (did) {
      var uri = 'at://' + did + '/app.bsky.feed.post/' + parsed.rkey;
      return Promise.all([
        fetchAllLikes(uri),
        fetchThread(uri),
        fetchAllQuotes(uri)
      ]).then(function (results) {
        return {
          url: url,
          handle: parsed.handle,
          uri: uri,
          likes: results[0],
          thread: results[1] ? results[1].thread : null,
          quotes: results[2]
        };
      });
    }).catch(function (e) {
      console.warn('Bluesky: could not load data for', url, e);
      return null;
    });
  }

  /* ---- Render helpers ---- */

  function countReplies(thread) {
    if (!thread || !thread.replies) return 0;
    return thread.replies.reduce(function (n, r) { return n + 1 + countReplies(r); }, 0);
  }

  var BSKY_BUTTERFLY_SVG =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">' +
    '<path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501' +
    'C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37' +
    ' 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327' +
    ' 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3"/>' +
    '</svg>';

  function renderAvatar(actor) {
    var displayName = actor.displayName || actor.handle;
    var profileUrl = 'https://bsky.app/profile/' + encodeURIComponent(actor.handle);
    var cls = 'bsky-avatar';

    if (actor.avatar) {
      return '<a href="' + escapeHtml(profileUrl) + '" target="_blank" rel="noopener noreferrer"' +
        ' class="' + cls + '" title="' + escapeHtml(displayName) + '">' +
        '<img src="' + escapeHtml(actor.avatar) + '" alt="' + escapeHtml(displayName) + '" loading="lazy" />' +
        '</a>';
    }
    return '<a href="' + escapeHtml(profileUrl) + '" target="_blank" rel="noopener noreferrer"' +
      ' class="' + cls + ' bsky-avatar-placeholder" title="' + escapeHtml(displayName) + '">' +
      escapeHtml(displayName.charAt(0).toUpperCase()) +
      '</a>';
  }

  function renderPostCard(post, depth) {
    var author = post.author;
    var record = post.record || {};
    var displayName = author.displayName || author.handle;
    var profileUrl = 'https://bsky.app/profile/' + encodeURIComponent(author.handle);
    var rkey = post.uri.split('/').pop();
    var postUrl = 'https://bsky.app/profile/' + encodeURIComponent(author.handle) + '/post/' + rkey;
    var createdAt = record.createdAt || post.indexedAt || '';
    var text = record.text || '';
    var indent = Math.min(depth || 0, 4) * 20;
    var depthClass = (depth && depth > 0) ? ' bsky-reply-nested' : '';
    var styleAttr = indent ? ' style="margin-left:' + indent + 'px"' : '';

    return '<div class="bsky-reply' + depthClass + '"' + styleAttr + '>' +
      '<div class="bsky-reply-header">' +
      renderAvatar(author) +
      '<div class="bsky-reply-meta">' +
      '<a href="' + escapeHtml(profileUrl) + '" target="_blank" rel="noopener noreferrer"' +
      ' class="bsky-reply-author">' + escapeHtml(displayName) + '</a>' +
      ' <span class="bsky-reply-handle">@' + escapeHtml(author.handle) + '</span>' +
      ' &middot; ' +
      '<a href="' + escapeHtml(postUrl) + '" target="_blank" rel="noopener noreferrer"' +
      ' class="bsky-reply-time">' + escapeHtml(timeAgo(createdAt)) + '</a>' +
      '</div>' +
      '</div>' +
      '<div class="bsky-reply-text">' + escapeHtml(text) + '</div>' +
      '<div class="bsky-reply-stats">' +
      '<span>\u2764\ufe0f ' + (post.likeCount || 0) + '</span>' +
      ' <span>\ud83d\udcac ' + (post.replyCount || 0) + '</span>' +
      ' <span>\ud83d\udd01 ' + (post.repostCount || 0) + '</span>' +
      '</div>' +
      '</div>';
  }

  function renderThreadNode(node, depth) {
    if (!node || node.$type !== 'app.bsky.feed.defs#threadViewPost') return '';
    var html = renderPostCard(node.post, depth || 0);
    if (node.replies && node.replies.length > 0) {
      node.replies.forEach(function (child) {
        html += renderThreadNode(child, (depth || 0) + 1);
      });
    }
    return html;
  }

  function renderReplies(threads) {
    var html = '';
    threads.forEach(function (thread) {
      if (thread && thread.replies) {
        thread.replies.forEach(function (reply) {
          html += renderThreadNode(reply, 0);
        });
      }
    });
    return html;
  }

  function renderQuotes(quotes) {
    return quotes.map(function (feedItem) {
      var post = feedItem.post;
      return '<div class="bsky-quote">' + renderPostCard(post, 0) + '</div>';
    }).join('');
  }

  /* ---- DOM update ---- */

  function show(el) { if (el) el.style.display = ''; }
  function hide(el) { if (el) el.style.display = 'none'; }
  function setText(sel, val) {
    var el = container.querySelector(sel);
    if (el) el.textContent = val;
  }
  function setHtml(sel, val) {
    var el = container.querySelector(sel);
    if (el) el.innerHTML = val;
  }

  function applyResults(allLikes, threads, allQuotes, perAuthorResults) {
    hide(container.querySelector('.bsky-loading'));
    show(container.querySelector('.bsky-likes-section'));
    show(container.querySelector('.bsky-tabs-section'));

    /* Likes */
    setText('.bsky-likes-total', allLikes.length);
    var avatarsEl = container.querySelector('.bsky-likes-avatars');
    if (avatarsEl) {
      var avatarHtml = allLikes.slice(0, 30).map(function (like) {
        return renderAvatar(like.actor);
      }).join('');
      if (allLikes.length > 30) {
        avatarHtml += '<span class="bsky-likes-more">+' + (allLikes.length - 30) + '</span>';
      }
      avatarsEl.innerHTML = avatarHtml;
    }

    /* Replies */
    var totalReplies = threads.reduce(function (n, t) { return n + countReplies(t); }, 0);
    setText('[data-bsky-tab="replies"] .bsky-tab-count', totalReplies);
    var repliesHtml = renderReplies(threads);
    setHtml('#bsky-panel-replies', repliesHtml || '<p class="bsky-empty">No replies yet.</p>');

    /* Quotes */
    setText('[data-bsky-tab="quotes"] .bsky-tab-count', allQuotes.length);
    var quotesHtml = renderQuotes(allQuotes);
    setHtml('#bsky-panel-quotes', quotesHtml || '<p class="bsky-empty">No quotes yet.</p>');

    /* Per-author breakdown */
    if (perAuthorResults && perAuthorResults.length > 1) {
      var perAuthorEl = container.querySelector('.bsky-per-author');
      if (perAuthorEl) {
        var html = '<h4 class="bsky-per-author-title">Per-Author Breakdown</h4>' +
          '<div class="bsky-per-author-grid">';
        perAuthorResults.forEach(function (r) {
          var replyCount = countReplies(r.thread);
          html +=
            '<div class="bsky-author-card">' +
            '<div class="bsky-author-card-header">' +
            '<span class="bsky-icon-inline">' + BSKY_BUTTERFLY_SVG + '</span>' +
            '<a href="' + escapeHtml(r.url) + '" target="_blank" rel="noopener noreferrer">' +
            '@' + escapeHtml(r.handle) + '</a>' +
            '</div>' +
            '<ul class="bsky-author-stats-list">' +
            '<li>\u2764\ufe0f <strong>' + r.likes.length + '</strong> likes</li>' +
            '<li>\ud83d\udcac <strong>' + replyCount + '</strong> replies</li>' +
            '<li>\ud83d\udd01 <strong>' + r.quotes.length + '</strong> quotes</li>' +
            '</ul>' +
            '</div>';
        });
        html += '</div>';
        perAuthorEl.innerHTML = html;
        show(perAuthorEl);
      }
    }
  }

  /* ---- Initialisation ---- */

  function init() {
    Promise.all(postUrls.map(loadPostData)).then(function (results) {
      var valid = results.filter(Boolean);

      if (valid.length === 0) {
        hide(container.querySelector('.bsky-loading'));
        show(container.querySelector('.bsky-error'));
        return;
      }

      var allLikes = [];
      var allQuotes = [];
      var allThreads = [];

      valid.forEach(function (r) {
        allLikes = allLikes.concat(r.likes);
        allQuotes = allQuotes.concat(r.quotes);
        if (r.thread) allThreads.push(r.thread);
      });

      /* Deduplicate likes by actor DID */
      var seenDids = Object.create(null);
      allLikes = allLikes.filter(function (like) {
        var did = like.actor && like.actor.did;
        if (!did || seenDids[did]) return false;
        seenDids[did] = true;
        return true;
      });

      /* Deduplicate quotes by post URI */
      var seenUris = Object.create(null);
      allQuotes = allQuotes.filter(function (q) {
        var uri = q.post && q.post.uri;
        if (!uri || seenUris[uri]) return false;
        seenUris[uri] = true;
        return true;
      });

      var perAuthor = (!condensedView && valid.length > 1) ? valid : null;
      applyResults(allLikes, allThreads, allQuotes, perAuthor);
    }).catch(function (e) {
      console.error('Bluesky interactions error:', e);
      hide(container.querySelector('.bsky-loading'));
      show(container.querySelector('.bsky-error'));
    });
  }

  /* ---- Tab switching (vanilla JS, no dependencies) ---- */

  container.addEventListener('click', function (e) {
    var tabBtn = e.target && e.target.closest ? e.target.closest('[data-bsky-tab]') : null;
    if (!tabBtn) return;

    var tabName = tabBtn.getAttribute('data-bsky-tab');

    container.querySelectorAll('[data-bsky-tab]').forEach(function (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabBtn.classList.add('active');
    tabBtn.setAttribute('aria-selected', 'true');

    container.querySelectorAll('[data-bsky-panel]').forEach(function (panel) {
      panel.classList.remove('active');
    });
    var activePanel = container.querySelector('#bsky-panel-' + tabName);
    if (activePanel) activePanel.classList.add('active');
  });

  init();
})();
