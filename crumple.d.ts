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
  /** True between a webglcontextlost and the matching restore: nothing is drawn meanwhile. */
  isLost(): boolean;
  /** Frees the programs, buffers, textures and framebuffers, then releases the GL context. Release the papers first. */
  destroy(): void;
}
export interface RendererOptions {
  /** Runs after the browser restores a lost context: papers made before the loss must be built again. */
  onRestore?(): void;
}
export function Renderer(canvas: HTMLCanvasElement, options?: RendererOptions): RendererApi | null;

/** How motion is handled: 'auto' follows prefers-reduced-motion, 'reduce' and 'full' force it. */
export type MotionMode = 'auto' | 'reduce' | 'full';

export interface SceneLabels { flip?: string; tear?: string; close?: string; hint?: string; open?: string; back?: string }
export interface SceneOptions {
  labels?: SceneLabels;
  /** Opened papers return loosely crumpled (and stay that way until reset()). */
  remember?: boolean;
  /** 'auto' follows prefers-reduced-motion (and reacts when it changes). */
  /** 'reduced' is the old spelling of 'reduce', still accepted. */
  motion?: MotionMode | 'reduced';
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
  /** Makes a trigger open a paper. Attaching the same element again replaces its binding; an id already in use detaches the older paper (with a console warning). Before the body exists, binding waits for DOMContentLoaded. */
  attach(trigger: HTMLElement, config: PaperConfig, options?: AttachOptions): SceneEntry;
  /** Undoes attach for one trigger element, or for the paper with that id. */
  detach(target: HTMLElement | string): void;
  /** Removes the overlay, listeners, observers and the WebGL context. attach() (or init()) starts it again. */
  destroy(): void;
  open(entry: SceneEntry): Promise<void>;
  close(): void;
  flip(): void;
  tear(): void;
  /** Forget which papers were opened (with remember on). */
  reset(): void;
  readonly reducedMotion: boolean;
  readonly entries: SceneEntry[];
  readonly isOpen: boolean;
  /** @internal test hook: draws a fixed frame of an attached paper. */
  frame(index: number, tf: number, p: number, f?: number, tear?: number, destroy?: number): Promise<void>;
  /** @internal test hook: lights the flashlight at screen (x, y). */
  flashlight(x: number, y: number): void;
  /** @internal test hook: the animation state, for tests. */
  readonly debug: { phase: string; ashes: boolean; destroy: number | undefined; n: number; raf: number; tw: string[]; lampPos: number[] | null; lamp: number } | null;
};

export interface StageOptions {
  flashlight?: boolean;
  drag?: boolean;
  /** Share of the canvas height the open sheet takes. */
  fit?: number;
  /** 'auto' follows prefers-reduced-motion; reduced motion runs the tweens at 40% of their time. */
  motion?: MotionMode;
}
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
  /** Frees the paper, listeners and the WebGL context. Every method is a no-op afterwards. */
  destroy(): void;
  /** @internal test hook: the animation state, for tests. */
  readonly state: Record<string, unknown>;
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
