import * as LinkifyIt from 'linkify-it';
import { linkifyMatch } from '../hyperlink/utils';

// modified version of the original Linkify plugin
// https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js
const arrayReplaceAt = (src, pos, newElements) => {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
};

const isLinkOpen = str => {
  return /^<a[>\s]/i.test(str);
};

const isLinkClose = str => {
  return /^<\/a\s*>/i.test(str);
};

const linkify = state => {
  const blockTokens = state.tokens;
  const linkify = new LinkifyIt();

  for (let j = 0, l = blockTokens.length; j < l; j++) {
    if (
      blockTokens[j].type !== 'inline' ||
      !linkify.pretest(blockTokens[j].content)
    ) {
      continue;
    }

    let tokens = blockTokens[j].children;
    let htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (let i = tokens.length - 1; i >= 0; i--) {
      const currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (
          tokens[i].level !== currentToken.level &&
          tokens[i].type !== 'link_open'
        ) {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) {
        continue;
      }

      if (currentToken.type === 'text' && linkify.test(currentToken.content)) {
        const text = currentToken.content;
        let links = linkifyMatch(text);
        if (!links.length) {
          links = linkify.match(text);
        }

        // Now split string to nodes
        const nodes: object[] = [];
        let level = currentToken.level;
        let lastPos = 0;

        for (let ln = 0; ln < links.length; ln++) {
          const { url } = links[ln];
          const fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) {
            continue;
          }

          let urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md
              .normalizeLinkText('http://' + urlText)
              .replace(/^http:\/\//, '');
          } else if (
            links[ln].schema === 'mailto:' &&
            !/^mailto:/i.test(urlText)
          ) {
            urlText = state.md
              .normalizeLinkText('mailto:' + urlText)
              .replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          const pos = links[ln].index;

          if (pos > lastPos) {
            const token = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level = level;
            nodes.push(token);
          }

          let token = new state.Token('link_open', 'a', 1);
          token.attrs = [['href', fullUrl]];
          token.level = level++;
          token.markup = 'linkify';
          token.info = 'auto';
          nodes.push(token);

          token = new state.Token('text', '', 0);
          token.content = urlText;
          token.level = level;
          nodes.push(token);

          token = new state.Token('link_close', 'a', -1);
          token.level = --level;
          token.markup = 'linkify';
          token.info = 'auto';
          nodes.push(token);

          lastPos = links[ln].lastIndex;
        }

        if (lastPos < text.length) {
          const token = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};

export default md => md.core.ruler.push('custom-linkify', linkify);
