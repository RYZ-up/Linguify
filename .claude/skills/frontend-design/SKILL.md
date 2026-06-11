---
name: frontend-design
description: Generates distinctive, production-grade frontend interfaces that avoid generic AI aesthetics. Use when building UI components, pages, dashboards, or any visual interface. Trigger on requests like "create a dashboard", "build a landing page", "design a component".
---

# Frontend Design Skill

## Core Philosophy

Before writing a single line of code, establish a clear **aesthetic stance**. Ask: what is this for, who uses it, what feeling should it evoke? Then execute with intentionality and precision.

Reject generic AI-generated aesthetics:

- No overused typefaces (avoid defaulting to Inter/Arial/Roboto without reason)
- No predictable card-grid-button layouts
- No cookie-cutter color schemes (#3B82F6 blue on white)
- No scattered, purposeless micro-interactions

## Visual Excellence Checklist

**Typography**

- Choose typefaces with personality that match the context
- Establish clear typographic hierarchy (size, weight, spacing)
- Use `font-feature-settings` for refined details when appropriate

**Color**

- Define a cohesive palette via CSS custom properties
- Use color with intent contrast, hierarchy, emotion
- Avoid "safe" palettes; make a choice and commit to it

**Motion**

- Micro-interactions that feel earned, not decorative
- Transitions that reinforce spatial metaphors
- Complexity of animation should match aesthetic vision: maximalist → elaborate; refined → restrained

**Layout & Space**

- Unconventional compositions when the context warrants it
- Whitespace as a design element, not an afterthought
- Avoid symmetrical grids as default earn the grid

**Atmosphere**

- Contextual background details (gradients, textures, noise)
- Depth through shadow, blur, layering
- Details that make the interface feel _crafted_, not generated

## Implementation Standards

- Functional and polished across frameworks: HTML/CSS/JS, React, Vue, Svelte
- CSS variables for all design tokens
- Responsive by default, mobile-first when appropriate
- Accessible: sufficient contrast, keyboard nav, semantic HTML
- Production-ready code, not prototype sketches

## The Directive

Claude is capable of extraordinary creative work. Don't hold back. Make a real aesthetic choice and execute it with craft.
