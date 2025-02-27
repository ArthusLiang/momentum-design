import { File as SDFile, TransformedToken } from 'style-dictionary';

import { CONSTANTS } from '../../common';

import type { Config } from './types';

class File {
  protected config: Config;

  public constructor(config: Config) {
    this.config = structuredClone(config);
  }

  public get categories(): Array<string> {
    const { categories } = this.config.filters;

    return categories ? [...categories] : [];
  }

  public get destination(): string {
    return this.config.destination;
  }

  public get extension(): string {
    return CONSTANTS.FORMATS[this.config.format].EXTENSION;
  }

  public get file(): string {
    return `${this.destination}.${this.extension}`;
  }

  public get format(): string {
    return CONSTANTS.FORMATS[this.config.format].FORMAT;
  }

  public get filter(): (token: TransformedToken) => boolean {
    const { categories, items, types } = this;

    return (token: TransformedToken): boolean => {
      const matchesCategory = categories.length > 0 ? categories.includes(token?.attributes?.category ?? 'none') : true;
      const matchesItems = items.length > 0 ? items.includes(token?.attributes?.item ?? 'none') : true;
      const matchesTypes = types.length > 0 ? types.includes(token?.attributes?.type ?? 'none') : true;

      return matchesCategory && matchesItems && matchesTypes;
    };
  }

  public get items(): Array<string> {
    const { items } = this.config.filters;

    return items ? [...items] : [];
  }

  public get sdConfig(): SDFile {
    return {
      destination: this.file,
      format: this.format,
      filter: this.filter,
    };
  }

  public get types(): Array<string> {
    const { types } = this.config.filters;

    return types ? [...types] : [];
  }
}

export default File;
