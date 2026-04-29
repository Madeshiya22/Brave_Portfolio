import React from 'react';
import { X } from 'lucide-react';

const DesktopDock = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="about-taskbar desktop-dock" role="toolbar" aria-label="Desktop windows">
      {items.map(({ id, label, icon: Icon, previewTitle, previewSubtitle, previewAlt, image, onRestore, onClose }) => (
        <div className="about-taskbar__slot" key={id}>
          <button
            type="button"
            className="about-taskbar__item is-active"
            onClick={onRestore}
            aria-label={`Restore ${label}`}
            title={label}
          >
            <Icon size={13} />
            <span>{label}</span>
          </button>

          <div className="about-taskbar__preview" role="dialog" aria-label={`${label} preview`}>
            <div className="about-taskbar__preview-head">
              <span>
                <Icon size={14} />
                {label}
              </span>
              <button
                type="button"
                className="about-taskbar__preview-close"
                onClick={onClose}
                aria-label={`Close ${label}`}
              >
                <X size={14} />
              </button>
            </div>

            <button
              type="button"
              className="about-taskbar__preview-body"
              onClick={onRestore}
              aria-label={`Open ${label}`}
            >
              {image && <img src={image} alt={previewAlt ?? `${label} preview`} draggable={false} />}
              <div className="about-taskbar__preview-copy">
                <strong>{previewTitle}</strong>
                <p>{previewSubtitle}</p>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesktopDock;