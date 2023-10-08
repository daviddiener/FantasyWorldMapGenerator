// https://www.npmjs.com/package/simplex-noise
import alea from 'alea';
import { createNoise2D } from 'simplex-noise';

export default function getNoise(x: number, y: number, waveShare: number, seed: string): number {
  const simplex = createNoise2D(alea(seed))
  return simplex(x * waveShare, y * waveShare);
}