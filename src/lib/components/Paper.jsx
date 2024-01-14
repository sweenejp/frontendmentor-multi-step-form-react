import React from 'react';

// NOTE - react's style prop seems like a cleaner approach than svelte's solution to this
/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {React.HTMLAttributes<HTMLDivElement>['style']} props.style
 */
const Paper = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--magnolia)',
        padding: '12px',
        borderRadius: '7px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Paper;
