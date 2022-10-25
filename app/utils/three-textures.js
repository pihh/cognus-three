import { TextureLoader } from 'three';

export function normalTexture(file, material) {
  const textureLoader = new TextureLoader();
  const normalTexture = textureLoader.load('/textures/' + file);
  material.normalMap = normalTexture;
}
