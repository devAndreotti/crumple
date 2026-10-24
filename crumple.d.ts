// Type definitions for @devandreotti/crumple

export type PaperType = 'typed' | 'notebook' | 'form' | 'receipt' | 'ticket' | 'memo' | 'newspaper' | 'sticky' | 'polaroid' | 'envelope';
export type PaperShape = 'ball' | 'flat' | 'quarters' | 'half' | 'thirds' | 'roll' | 'twist';
export type PaperState = 'torn' | 'burnt' | 'coffee' | 'water' | 'prints' | 'aged' | 'scribbled' | 'singed';
/** Where a burn starts: from one corner (default), along one whole side, a hole burnt from inside, or a few embers. */
export type BurnForm = 'corner' | 'edge' | 'center' | 'spots';

export interface PaperConfig {
  /** Unique id (used for storage keys and events). Defaults to the type. */
  id?: string;
  type?: PaperType;
  /** Closed shape. Envelopes always use their own shape. */
  shape?: PaperShape;
  states?: PaperState[];
  /** Front text. "# " heading, ~~word~~{fix} struck out and corrected, [[text]] redaction that fades per opening. */
  text?: string;
  /** Back text (flip with the button, double click or the F key). */
  back?: string;
  seed?: number;
  /** 'auto' unfolds by itself; 'drag' waits for the reader to drag or pinch it open. */
  open?: 'auto' | 'drag';
  /** Indented writing, visible only under grazing light (the flashlight). */
  hiddenInk?: string;
  /** On close the paper burns away for good (remembered in localStorage). */
  burnAfterReading?: boolean;
  /** Form of the burn for 'burnt', burnAfterReading and Stage.burn(). Invalid values fall back to 'corner'. */
  burn?: BurnForm;
  /** Photo URL for the polaroid type (same origin or CORS-enabled). */
  image?: string;
  /** Address written on the envelope. */
  address?: string;
  /** Type of the letter inside an envelope. */
  letter?: Exclude<PaperType, 'envelope'>;
}

export interface TypeInfo { name: string; w: number; h: number; color: [number, number, number]; shape: PaperShape | 'envelope'; font: string; [key: string]: unknown }

export const TYPES: Record<PaperType, TypeInfo>;
export const SHAPES: Record<PaperShape, string>;
export const STATES: Record<PaperState, string>;
export const TEXTS: Record<PaperType, string>;
export function normalize(config?: PaperConfig): Required<PaperConfig>;
export const version: string;

export const config: {
  /** Base URL of the assets folder (textures and demo photos). */
  assets: string;
  /** Prefix for localStorage keys. */
  storagePrefix: string;
  /** Load the paper fonts from Google Fonts on demand. */
  googleFonts: boolean;
};

export interface Paper { cfg: Required<PaperConfig>; bytes: number; [key: string]: unknown }

export interface RendererApi {
  gl: WebGL2RenderingContext;
  build(config: PaperConfig): Promise<Paper>;
  /** Adds a burn field to a paper that has none (Stage.burn does this itself). */
  ensureBurn(paper: Paper): Promise<void>;
  release(paper: Paper): void;
  /** Still image of a closed paper (or a loosely crumpled one with opened = true) as a data URL. */
  snapshot(paper: Paper, opened?: boolean, format?: string, size?: number): string;
}
export function Renderer(canvas: HTMLCanvasElement): RendererApi | null;

export interface SceneLabels { flip?: string; tear?: string; close?: string; hint?: string; open?: string; back?: string }
export interface SceneOptions {
  labels?: SceneLabels;
  /** Opened papers return loosely crumpled (and stay that way until reset()). */
  remember?: boolean;
  /** 'auto' follows prefers-reduced-motion. */
  motion?: 'auto' | 'full' | 'reduced';
  /** Low warm light that follows the mouse over the open sheet. */
  flashlight?: boolean;
  /** How many papers keep their GPU textures at once. */
  maxBuilt?: number;
}
export interface AttachOptions {
  /** Pre-rendered still image of the closed paper (skips building it until the reader gets close). */
  snapshot?: string;
  /** Still image of the loosely crumpled paper (used with remember). */
  snapshotOpened?: string;
}
export interface SceneEntry { btn: HTMLElement; cfg: Required<PaperConfig> }
export const Scene: {
  init(options?: SceneOptions): void;
  attach(trigger: HTMLElement, config: PaperConfig, options?: AttachOptions): SceneEntry;
  open(entry: SceneEntry): Promise<void>;
  close(): void;
  flip(): void;
  tear(): void;
  /** Forget which papers were opened (with remember on). */
  reset(): void;
  readonly reducedMotion: boolean;
  readonly entries: SceneEntry[];
  readonly isOpen: boolean;
};

export interface StageOptions { flashlight?: boolean; drag?: boolean; fit?: number }
export interface StageApi {
  set(config: PaperConfig, options?: { progress?: number }): Promise<Paper | null>;
  crumple(): void;
  uncrumple(): void;
  toggle(): void;
  flip(): void;
  tear(): void;
  restoreStub(): void;
  /** Burns the paper from its burn form. Builds the burn field first if the paper has none; resolves once the burn has started (a second call while pending does nothing). */
  burn(): Promise<void>;
  restore(): void;
  /** 0 = closed, 1 = fully open. */
  setProgress(value: number): void;
  png(): string;
  snapshot(opened?: boolean, format?: string, size?: number): string;
  readonly paper: Paper | null;
}
export function Stage(canvas: HTMLCanvasElement, options?: StageOptions): StageApi | null;

export const Sound: {
  readonly enabled: boolean;
  set(enabled: boolean): void;
  /** Optional recordings used instead of the synthesized sounds. */
  useSamples(urls: { crumple?: string; sheet?: string; tear?: string }): void;
  play(name: 'crumple' | 'uncrumple' | 'flip' | 'tear' | 'seal' | 'fire' | 'grain', duration?: number, delay?: number): void;
};

declare global {
  interface HTMLElementEventMap {
    'crumple:open': CustomEvent<{ id: string; openings?: number; fallback?: boolean }>;
    'crumple:close': CustomEvent<{ id: string }>;
    'crumple:flip': CustomEvent<{ id: string; back: boolean }>;
    'crumple:tear': CustomEvent<{ id: string }>;
    'crumple:burn': CustomEvent<{ id: string }>;
  }
}
