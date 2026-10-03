import { type MouseEvent, useRef } from 'react';

type IProps = {
  /** Путь к файлу изображения */
  src: string;
  /** alt */
  alt: string;
  /** коэффициент увеличения */
  zoom?: number;
  /** className */
  className?: string;
};

/** Компонент для увеличения изображения */
export const ZoomImage = ({ src, alt, zoom = 2, className }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty('--ox', `${x}%`);
    el.style.setProperty('--oy', `${y}%`);
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (!el) return;
    // Плавно возвращаем origin в центр,
    // чтобы анимация "уменьшения" тоже была от центра
    el.style.removeProperty('--ox');
    el.style.removeProperty('--oy');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-lg cursor-default sm:cursor-zoom-in ${className ?? ''}`}
      style={
        {
          // значения по умолчанию — центр
          '--ox': '50%',
          '--oy': '50%',
        } as React.CSSProperties
      }
    >
      <img
        src={src}
        alt={alt}
        className="
          w-full h-full object-cover
          transition-transform duration-300 ease-out
          will-change-transform
          [transform-origin:var(--ox)_var(--oy)]
          sm:group-hover:[transform:scale(var(--zoom))]
        "
        style={{ '--zoom': zoom } as React.CSSProperties}
      />
    </div>
  );
};
