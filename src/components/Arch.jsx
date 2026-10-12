import PlantArt from './PlantArt.jsx';

/** Arch-shaped frame: shows `photo` if given, otherwise the line drawing for `art`. */
export default function Arch({ photo, alt = '', art, bg = 'celadon', height = 300, className = '' }) {
  return (
    <div className={`arch bg-${bg} ${className}`} style={{ height }}>
      {photo ? <img src={photo} alt={alt} /> : <PlantArt kind={art} />}
    </div>
  );
}
