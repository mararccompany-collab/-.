import DOMPurify from 'dompurify';

const purify = DOMPurify as any;

// Ensure links open safely and have rel attributes
purify.addHook?.('afterSanitizeAttributes', function(node: any) {
  try {
    if (node.tagName === 'A') {
      if (!node.getAttribute('target')) node.setAttribute('target', '_blank');
      const rel = (node.getAttribute('rel') || '').split(' ').filter(Boolean);
      ['noopener', 'noreferrer', 'nofollow'].forEach(r => { if (!rel.includes(r)) rel.push(r); });
      node.setAttribute('rel', rel.join(' '));
    }
  } catch (e) { /* ignore */ }
});

export function sanitize(html: string) {
  return purify.sanitize(html, { ALLOWED_TAGS: undefined, ALLOWED_ATTR: undefined });
}

export default sanitize;
