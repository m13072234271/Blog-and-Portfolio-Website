export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface BlogMeta extends ContentMeta {
  series?: string;
  seriesOrder?: number;
}

export interface WorkMeta extends ContentMeta {}
