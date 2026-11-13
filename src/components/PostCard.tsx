import React, { useState } from 'react';
import { PostVariant, SocialPlatform } from '../types/index.js';
import { useStore } from '../store/useStore.js';
import { TRANSLATIONS } from '../i18n/translations.js';
import {
  Copy,
  Check,
  Send,
  Video,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Play,
  Pin,
} from 'lucide-react';

const InstagramGradientIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="cardIgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#8134AF" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#cardIgGrad)"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#cardIgGrad)"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#cardIgGrad)"></line>
  </svg>
);

interface PostCardProps {
  variant: PostVariant;
  index: number;
  platform: SocialPlatform;
  isStreaming?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  variant,
  index,
  platform,
  isStreaming = false,
}) => {
  const { uiLanguage, copyText, copiedId } = useStore();
  const t = TRANSLATIONS[uiLanguage];

  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [flashingZone, setFlashingZone] = useState<string | null>(null);

  const cardAllId = `card-all-${variant.id}`;
  const titleId = `title-${variant.id}`;
  const bodyId = `body-${variant.id}`;
  const ctaId = `cta-${variant.id}`;
  const tagsId = `tags-${variant.id}`;

  const triggerCopy = async (text: string, id: string) => {
    setFlashingZone(id);
    setTimeout(() => setFlashingZone(null), 350);
    await copyText(text, id);
  };

  const getFullPostText = () => {
    const parts = [
      variant.title,
      variant.body,
      variant.cta,
      variant.hashtags.join(' '),
    ].filter(Boolean);
    return parts.join('\n\n');
  };

  const isCopied = (id: string) => copiedId === id;

  // Platform Header Mimicry with custom platform colors
  const renderPlatformHeader = () => {
    if (platform === 'telegram') {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: '#F0F9FF',
            borderBottom: '1px solid #BAE6FD',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #229ED9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#229ED9',
                boxShadow: '0 2px 6px rgba(34, 158, 217, 0.2)',
              }}
            >
              <Send size={16} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{t.tgChannelName}</span>
                <Pin size={12} color="#229ED9" />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {t.tgPostMeta}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '4px 10px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#229ED9',
              border: '1px solid #BAE6FD',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {t.variantPrefix} {index + 1} {variant.angleTitle ? `• ${variant.angleTitle}` : ''}
          </div>
        </div>
      );
    }

    if (platform === 'youtube') {
      return (
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: '#FEF2F2',
            borderBottom: '1px solid #FECACA',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E53935',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E53935',
                  boxShadow: '0 2px 6px rgba(229, 57, 53, 0.2)',
                }}
              >
                <Video size={16} />
              </div>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t.ytStudioTitle}
                </span>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t.ytStudioMeta}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '4px 10px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-pill)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#E53935',
                border: '1px solid #FECACA',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {t.variantPrefix} {index + 1} {variant.angleTitle ? `• ${variant.angleTitle}` : ''}
            </div>
          </div>

          {/* 16:9 Thumbnail video placeholder */}
          <div
            style={{
              aspectRatio: '16/9',
              maxHeight: '130px',
              backgroundColor: '#1E1D24',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              padding: '14px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#E53935',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                marginBottom: '6px',
                boxShadow: '0 3px 8px rgba(229, 57, 53, 0.4)',
              }}
            >
              <Play size={16} fill="white" />
            </div>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#FFFFFF',
                textAlign: 'center',
                maxWidth: '90%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {variant.title || t.ytDefaultPreview}
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              12:15
            </span>
          </div>
        </div>
      );
    }

    // Instagram
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: '#FDF2F8',
          borderBottom: '1px solid #FBCFE8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #C13584',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C13584',
              boxShadow: '0 2px 6px rgba(193, 53, 132, 0.2)',
            }}
          >
            <InstagramGradientIcon size={17} />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{t.igUsername}</span>
              <span style={{ fontSize: '11px', color: '#C13584', fontWeight: 600 }}>
                {t.igFollowBtn}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {t.igPostMeta}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              padding: '4px 10px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#C13584',
              border: '1px solid #FBCFE8',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {t.variantPrefix} {index + 1} {variant.angleTitle ? `• ${variant.angleTitle}` : ''}
          </div>
          <MoreHorizontal size={16} color="var(--text-muted)" />
        </div>
      </div>
    );
  };

  return (
    <div
      id={cardAllId}
      className={flashingZone === cardAllId ? 'flash-highlight' : ''}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        transition: 'all 200ms ease',
      }}
    >
      {/* Header Mimicry */}
      {renderPlatformHeader()}

      {/* Action Sub-bar with "Скопировать всё" in Deep Blue */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
          {t.cardSubHeader}
        </span>

        <button
          onClick={() => triggerCopy(getFullPostText(), cardAllId)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            borderRadius: 'var(--radius-btn)',
            backgroundColor: isCopied(cardAllId) ? 'var(--accent-muted)' : 'var(--accent-primary)',
            color: isCopied(cardAllId) ? 'var(--accent-primary)' : '#FFFFFF',
            border: `1px solid ${isCopied(cardAllId) ? 'var(--accent-primary)' : 'transparent'}`,
            boxShadow: isCopied(cardAllId) ? 'none' : '0 2px 8px rgba(35, 75, 131, 0.25)',
            transition: 'all 160ms ease',
          }}
          onMouseEnter={(e) => {
            if (!isCopied(cardAllId)) {
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isCopied(cardAllId)) {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            }
          }}
        >
          {isCopied(cardAllId) ? (
            <>
              <Check size={14} />
              <span>{t.copiedBtn}</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>{t.copyAllBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* 4 Clean Visual Zones */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Zone 1: Headline / Hook */}
        <div
          id={titleId}
          onMouseEnter={() => setHoveredZone(titleId)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => variant.title && triggerCopy(variant.title, titleId)}
          className={flashingZone === titleId ? 'flash-highlight' : ''}
          style={{
            position: 'relative',
            padding: '8px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: hoveredZone === titleId ? 'var(--accent-muted)' : 'transparent',
            transition: 'all 140ms ease',
          }}
        >
          {hoveredZone === titleId && (
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '12px',
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {isCopied(titleId) ? t.copiedBtn : t.copyTitleTip}
            </div>
          )}

          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: '1.35',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {isStreaming ? (
              <span className="streaming-word">{variant.title || t.hookPlaceholder}</span>
            ) : (
              variant.title || t.titlePlaceholder
            )}
          </h3>
        </div>

        {/* Zone 2: Main Body */}
        <div
          id={bodyId}
          onMouseEnter={() => setHoveredZone(bodyId)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => variant.body && triggerCopy(variant.body, bodyId)}
          className={flashingZone === bodyId ? 'flash-highlight' : ''}
          style={{
            position: 'relative',
            padding: '12px',
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: hoveredZone === bodyId ? 'var(--accent-muted)' : 'transparent',
            whiteSpace: 'pre-line',
            fontSize: '15px',
            lineHeight: '1.65',
            color: 'var(--text-primary)',
            transition: 'all 140ms ease',
          }}
        >
          {hoveredZone === bodyId && (
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '12px',
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {isCopied(bodyId) ? t.copiedBtn : t.copyBodyTip}
            </div>
          )}

          {isStreaming ? (
            <span className="streaming-word">{variant.body || t.bodyPlaceholderStream}</span>
          ) : (
            variant.body || t.bodyPlaceholder
          )}
        </div>

        {/* Zone 3: Call to Action (CTA) Box with noble blue accent */}
        <div
          id={ctaId}
          onMouseEnter={() => setHoveredZone(ctaId)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => variant.cta && triggerCopy(variant.cta, ctaId)}
          className={flashingZone === ctaId ? 'flash-highlight' : ''}
          style={{
            position: 'relative',
            padding: '14px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            backgroundColor: 'var(--accent-muted)',
            border: '1px solid var(--accent-border)',
            transition: 'all 140ms ease',
          }}
        >
          {hoveredZone === ctaId && (
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '12px',
                backgroundColor: 'var(--accent-primary)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {isCopied(ctaId) ? t.copiedBtn : t.copyCtaTip}
            </div>
          )}

          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--accent-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '4px',
            }}
          >
            {t.ctaHeader}
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {isStreaming ? (
              <span className="streaming-word">{variant.cta || t.ctaPlaceholderStream}</span>
            ) : (
              variant.cta || t.ctaPlaceholder
            )}
          </p>
        </div>

        {/* Zone 4: Hashtags */}
        <div
          id={tagsId}
          onMouseEnter={() => setHoveredZone(tagsId)}
          onMouseLeave={() => setHoveredZone(null)}
          className={flashingZone === tagsId ? 'flash-highlight' : ''}
          style={{
            position: 'relative',
            padding: '10px 12px',
            borderRadius: '10px',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              {t.hashtagsLabel}
            </span>

            {hoveredZone === tagsId && (
              <button
                onClick={() =>
                  variant.hashtags.length > 0 && triggerCopy(variant.hashtags.join(' '), tagsId)
                }
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  backgroundColor: 'var(--accent-muted)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {isCopied(tagsId) ? t.copiedBtn : t.copyTagsTip}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {variant.hashtags.length > 0 ? (
              variant.hashtags.map((tag, tagIdx) => {
                const tagId = `tag-${variant.id}-${tagIdx}`;
                const tagCopied = isCopied(tagId);
                return (
                  <button
                    key={tagIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerCopy(tag, tagId);
                    }}
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: tagCopied ? '#FFFFFF' : 'var(--accent-text)',
                      backgroundColor: tagCopied ? 'var(--accent-primary)' : 'var(--accent-muted)',
                      border: '1px solid var(--accent-border)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      transition: 'all 120ms ease',
                    }}
                  >
                    {tagCopied ? `${tag} ✓` : tag}
                  </button>
                );
              })
            ) : (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {t.hashtagsPlaceholder}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Platform Footer Mimicry */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          backgroundColor: 'var(--bg-surface-subtle)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
            <MessageCircle size={15} />
            <span>24</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
            <Share2 size={15} />
            <span>8</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <Bookmark size={15} />
        </div>
      </div>
    </div>
  );
};
