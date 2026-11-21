import { COMPONENTS } from './registry';
import { DESIGN_FAMILIES } from '../design-families';
import type { ComponentMeta, DesignFamily } from '../design-families/types';

export { COMPONENTS };

export function getComponent(id: string): ComponentMeta {
  const component = COMPONENTS.find((c) => c.id === id);
  if (!component) throw new Error(`Unknown component "${id}"`);
  return component;
}

export function componentsIn(category: string): ComponentMeta[] {
  return COMPONENTS.filter((c) => c.category === category);
}

export function familiesPreferring(id: string): DesignFamily[] {
  return Object.values(DESIGN_FAMILIES).filter((f) =>
    [...f.layout.preferredHero, ...f.layout.preferredSections].includes(id),
  );
}

export function familiesAvoiding(id: string): DesignFamily[] {
  return Object.values(DESIGN_FAMILIES).filter((f) => f.layout.avoidSections.includes(id));
}
