import type { DesignFamily } from './types';

import { editorialLuxury } from './editorial-luxury';
import { swissMinimalism } from './swiss-minimalism';
import { modernBrutalism } from './modern-brutalism';
import { darkTechnology } from './dark-technology';
import { warmHospitality } from './warm-hospitality';
import { fashionCommerce } from './fashion-commerce';
import { propertyEditorial } from './property-editorial';
import { professionalHealthcare } from './professional-healthcare';
import { corporateInstitutional } from './corporate-institutional';
import { contemporaryAfrican } from './contemporary-african';
import { premiumAutomotive } from './premium-automotive';
import { architectureInteriors } from './architecture-interiors';
import { minimalistPortfolio } from './minimalist-portfolio';
import { creativePhotography } from './creative-photography';
import { restaurantEditorial } from './restaurant-editorial';
import { beautyCosmetics } from './beauty-cosmetics';
import { educationInstitution } from './education-institution';
import { financeConsulting } from './finance-consulting';
import { industrialManufacturing } from './industrial-manufacturing';
import { modernEcommerce } from './modern-ecommerce';

export const DESIGN_FAMILIES: Record<string, DesignFamily> = {
  'editorial-luxury': editorialLuxury,
  'swiss-minimalism': swissMinimalism,
  'modern-brutalism': modernBrutalism,
  'dark-technology': darkTechnology,
  'warm-hospitality': warmHospitality,
  'fashion-commerce': fashionCommerce,
  'property-editorial': propertyEditorial,
  'professional-healthcare': professionalHealthcare,
  'corporate-institutional': corporateInstitutional,
  'contemporary-african': contemporaryAfrican,
  'premium-automotive': premiumAutomotive,
  'architecture-interiors': architectureInteriors,
  'minimalist-portfolio': minimalistPortfolio,
  'creative-photography': creativePhotography,
  'restaurant-editorial': restaurantEditorial,
  'beauty-cosmetics': beautyCosmetics,
  'education-institution': educationInstitution,
  'finance-consulting': financeConsulting,
  'industrial-manufacturing': industrialManufacturing,
  'modern-ecommerce': modernEcommerce,
};

export function getFamily(id: string): DesignFamily {
  const family = DESIGN_FAMILIES[id];
  if (!family) {
    throw new Error(
      `Unknown design family "${id}". Available: ${Object.keys(DESIGN_FAMILIES).join(', ')}`,
    );
  }
  return family;
}

export function findFamiliesForIndustry(industry: string): DesignFamily[] {
  const normalised = industry.toLowerCase();
  return Object.values(DESIGN_FAMILIES).filter(
    (f) =>
      f.industries.some((i) => i.includes(normalised) || normalised.includes(i)) ||
      f.description.toLowerCase().includes(normalised),
  );
}

export function listFamilies(): { id: string; name: string; description: string }[] {
  return Object.values(DESIGN_FAMILIES).map((f) => ({
    id: f.id,
    name: f.name,
    description: f.description,
  }));
}

export type { DesignFamily, ComponentMeta } from './types';
