---
theme: default
title: "Good Things Come to Those Who @defer"
author: Giorgio Galassi
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: Roboto
  mono: Roboto Mono
layout: image
image: /01-opener.png
---

<!--
Canva page 1. Pixel-art opener, exported as an image.
-->

---
layout: image
image: /02-reverse-card.png
footer: false
---

<!--
Reverse Q&A:

1. Chi sta affrontando, o ha già affrontato, la messa in regola del proprio applicativo per quanto riguarda l'accessibilità, a valle dell'Accessibility Act?
2. Quanti di voi misurano i Core Web Vitals?
3. Quanti di voi si preoccupano delle dimensioni del proprio bundle e di quanto codice viene scaricato dal browser Utente?
-->

---
class: table-slide
---

# Core Web Vitals

| | Metric | Good | Needs improvement | Poor |
|---|---|---|---|---|
| <span class="text-sm caption">Loading</span> | **<span class="accent">LCP</span>** Largest Contentful Paint | ≤ 2.5 s | ≤ 4.0 s | > 4.0 s |
| | **<span class="accent">TTFB</span>** Time To First Byte | ≤ 800 ms | ≤ 1800 ms | > 1800 ms |
| <span class="text-sm caption">Interactivity</span> | **<span class="accent">INP</span>** Interaction to Next Paint | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| <span class="text-sm caption">Visual stability</span> | **<span class="accent">CLS</span>** Cumulative Layout Shift | ≤ 0.1 | ≤ 0.25 | > 0.25 |

- **<span class="accent">Largest Contentful Paint (LCP)</span>**: measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.
- **<span class="accent">Time To First Byte (TTFB)</span>**: measures the time between the request for a resource and when the first byte of a response begins to arrive.
- **<span class="accent">Interaction to Next Paint (INP)</span>**: measures interactivity. To provide a good user experience, pages should have a INP of 200 milliseconds or less.
- **<span class="accent">Cumulative Layout Shift (CLS)</span>**: measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1. or less.

<!--
Questi sono alcuni dei Core Web Vitals che dovremmo tenere in considerazione ed ottimizzare.

<Spiegazione dei CWV>


Quindi abbiamo capito che...
-->

---
layout: image
image: /04-boromir.png
footer: false
---

<!--
Quando si parla di ottimizzare un'applicazione web non è semplice. 

Come abbiamo già accennato ci sono tante cose da tenere a mente, se vogliamo fare un lavoro come si deve.

Bundle, accessibilità, velocità di esecuzione etc...

Quello che vedremo oggi insieme ci aiuterà a gestire ognuno di questi problemi.

Infondo...
-->

---
layout: center
---

<div class="text-center">
  <div class="text-7xl font-medium leading-tight">Good Things Come to<br>Those Who <span class="accent">@defer</span></div>
  <div class="text-3xl accent mt-6 tracking-wide">Angular @defer system</div>
</div>

---
layout: image
image: /06-map-defer.png
footer: false
---

---
layout: center
---

<div class="definition">

Deferrable views, also known as <span class="accent">@defer</span> blocks, reduce the initial bundle size of your application by <span class="accent">deferring</span> the loading of code that is not strictly necessary for the initial rendering of a page. This often results in a faster initial load and improvement in <span class="accent">Core Web Vitals (CWV)</span>, primarily <span class="accent">Largest Contentful Paint (LCP)</span> and <span class="accent">Time to First Byte (TTFB)</span>.

</div>

---
layout: center
---

<!-- Canva pages 8–13: one slide, each click reveals the next block (Shiki Magic Move) -->

````md magic-move
```angular-html
@defer {
  <calendar-cmp />
}
```
```angular-html {3-5}
@defer {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```
```angular-html {3}
@defer {
  <calendar-cmp />
} @placeholder (minimum 500ms) {
  <img src="placeholder.png" />
}
```
```angular-html {5-7}
@defer {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
} @loading {
  <img alt="loading..." src="loading.gif" />
}
```
```angular-html {5}
@defer {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
}
```
```angular-html {7-9}
@defer {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @error {
  <p>Failed to load large component.</p>
}
```
````

<!--
Per essere caricati in modo deferito, i componenti/direttive/pipe in un blocco @defer devono:

1. Essere standalone
2. Non essere usati fuori dal blocco @defer nello stesso file

Le dipendenze transitive possono anche stare in un NgModule.

Angular genera import dinamici per ogni elemento deferito e mostra il contenuto solo quando tutti sono pronti — senza garantire l’ordine di caricamento.

[click] @placeholder mostra un contenuto provvisorio finché non si carica il contenuto deferito.

È opzionale, ma alcuni trigger - vedremo in breve cosa sono - lo richiedono.

[click] Supporta un parametro minimum per evitare sfarfallii e garantire una durata minima della visualizzazione.

[click] @loading mostra contenuto durante il caricamento delle dipendenze deferite.

È opzionale, ma sostituisce il @placeholder appena inizia il caricamento.

[click] Accetta due parametri:

1. minimum: durata minima di visualizzazione del contenuto.
2. after: ritardo prima di mostrare il contenuto.

Entrambi i timer partono quando il caricamento inizia.

[click] Il blocco @error è un blocco opzionale che viene mostrato se il caricamento delle dipendenze deferite fallisce.
-->

---
layout: center
---

<div class="flex items-center gap-8">
  <div class="callout text-3xl font-medium py-3 px-5">Eagerly<br>loading</div>

```angular-html {3-9}
@defer {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @error {
  <p>Failed to load large component.</p>
}
```

</div>

<!--
Tutte le dipendenze utilizzate all’interno di questi blocchi vengono caricate eagerly (cioè immediatamente).

Nota sull'utilizzo con NgModule:

I blocchi @defer sono compatibili sia con componenti, direttive e pipe standalone che con quelli basati su NgModule. Tuttavia, solo gli elementi standalone possono essere realmente differiti (cioè caricati in modo ritardato).

➡️ Le dipendenze basate su NgModule non vengono differite: sono incluse nel bundle principale e caricate subito (caricamento anticipato).
-->

---
layout: center
---

<div class="statement">Triggers</div>

<!--
Puoi specificare dei trigger che controllano quando Angular deve caricare e visualizzare il contenuto deferito.

Quando viene attivato un blocco @defer, il contenuto del placeholder viene sostituito con il contenuto caricato in modo lazy.

È possibile definire più trigger separandoli con un punto e virgola ;. In questo caso, i trigger verranno valutati come condizioni OR (basta che se ne attivi uno).

Esistono due tipi di trigger: on e when.
-->

---
layout: center
---

```angular-html {1}
@defer (on viewport) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @error {
  <p>Failed to load large component.</p>
}
```

---
layout: center
---

```angular-html {1-2}
<h1 #calendarHeader>Calendar</h1>
@defer (on viewport(calendarHeader)) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```

---
layout: center
---

```angular-html {1}
@defer (when condition) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @error {
  <p>Failed to load large component.</p>
}
```

---
layout: center
class: table-slide
---

| Title | Description | Function param |
|---|---|---|
| <span class="accent">`idle`</span> | Triggers when the browser is idle | No |
| <span class="accent">`viewport`</span> | Triggers when specified content enters the viewport | Yes |
| <span class="accent">`interaction`</span> | Triggers when the user interacts with specified element | Yes |
| <span class="accent">`hover`</span> | Triggers when the mouse hovers over specified area | Yes |
| <span class="accent">`immediate`</span> | Triggers immediately after non-deferred content has finished rendering | No |
| <span class="accent">`timer`</span> | Triggers after a specific duration | Yes |
| <span class="accent">`when`</span> | Accepts a custom conditional expression and loads the deferred content when the condition becomes truthy. | No |

---
layout: center
---

<div class="statement">DEMO</div>

---
layout: image
image: /21-map-hybrid.png
footer: false
---

<!--
Il blocco @defer può andare oltre. Può fare molto di più con il setting giusto.

Prima di poter vedere la sua forma finale dobbiamo introdurre e comprendere altre cose. 

Il rendering ibrido consente agli sviluppatori di combinare i vantaggi di:

SSR (Server-Side Rendering) – rendering sul server

SSG (Static Site Generation) – pre-rendering statico

CSR (Client-Side Rendering) – rendering sul client

Questa tecnica permette di ottimizzare l'app Angular offrendo un controllo preciso su come e quando ogni parte dell'app viene renderizzata.

🎯 Obiettivo: garantire agli utenti la migliore esperienza possibile, bilanciando prestazioni, velocità e interattività.
-->

---
layout: center
---

<div class="statement">Client Side Rendering<br>(CSR)</div>

---
layout: center
---

<div class="definition">

Is a JavaScript rendering technique where the final HTML content and user interface (UI) components are <span class="accent">generated on the client's browser using JavaScript</span>.

</div>

---
class: flow-slide
---

# Client Side Rendering (CSR)

<div class="flow">
  <div class="step"><b>🌐 Request</b>Web request for a site</div>
  <div class="arrow">➜</div>
  <div class="step"><b>🗄️ Server</b>Server send HTML files with JS links</div>
  <div class="arrow">➜</div>
  <div class="step"><b>🖥️ Browser</b>
    <ol>
      <li>Browser parses HTML and constructs DOM</li>
      <li>Browser downloads CSS and JS</li>
      <li>Browser executes JS code</li>
      <li>Browser loads the site</li>
    </ol>
  </div>
</div>

---
layout: center
---

<div class="statement">When to use it?</div>

---
layout: center
---

<ul class="star-list">
  <li>chat apps</li>
  <li>social media</li>
  <li>single-page app</li>
</ul>

---
layout: center
---

<div class="statement">Static site Generation<br>(SSG)</div>

---
layout: center
---

<div class="definition">

The page HTML is <span class="accent">generated at build time</span>.

</div>

---
class: flow-slide
---

# Static Site Generation (SSG)

<div class="flow">
  <div class="step"><b>📁 Code</b>Our code base</div>
  <div class="arrow">➜</div>
  <div class="step"><b>🛠️ Build</b>Build</div>
  <div class="arrow">➜</div>
  <div class="step"><b>🖥️ Browser</b>Browser renders the static site</div>
</div>

---
layout: center
---

<div class="statement">When to use it?</div>

---
layout: center
---

<ul class="star-list">
  <li>content-driven websites</li>
  <li>documentation</li>
  <li>blogs</li>
</ul>

---
layout: center
---

<div class="statement">Server Side Rendering<br>(SSR)</div>

---
layout: center
---

<div class="definition">

Is a rendering approach where the rendering process occurs on the server. In this approach, the server generates the <span class="accent">complete HTML page</span> with the rendered UI and sends it to the client's browser.

The browser then displays the fully rendered page without running any client-side JavaScript code.

</div>

---
class: flow-slide
---

# Server Side Rendering (SSR)

<div class="flow">
  <div class="step"><b>🌐 Request</b>Web request for a site</div>
  <div class="arrow">➜</div>
  <div class="step"><b>🗄️ Server</b>Server creates ready HTML page</div>
  <div class="arrow">➜</div>
  <div class="step"><b>🖥️ Browser</b>
    <ol>
      <li>Server renders HTML</li>
      <li>Browser parses &amp; paints HTML</li>
      <li>Browser downloads and executes JS</li>
      <li>Framework <b class="inline">hydrates</b> the existing DOM</li>
      <li>The site becomes interactive</li>
    </ol>
  </div>
</div>

<!--
1. Server-side render
Il server genera l’HTML (e, di solito, inlines critical CSS e TransferState).

2. Browser parse & paint (non interattivo)
Il browser scarica l’HTML/CSS, costruisce il DOM e lo mostra. Niente handler JS ancora → UI non interattiva.

3. Download & esecuzione JS
Il browser scarica i bundle (framework + app) e esegue il runtime.

4. Hydration
Il framework riutilizza il DOM esistente e aggancia event listener, stato e reattività ai nodi server-rendered (niente re-render completo se non ci sono mismatch).

5. Interattività
Man mano che l’hydration dei sottoalberi finisce (spesso progressiva), quelle parti diventano interattive; quando i chunk necessari sono idratati, la pagina è “fully interactive”.
-->

---
layout: center
---

<div class="statement">When to use it?</div>

---
layout: center
---

<ul class="star-list">
  <li>landing pages</li>
  <li>e-commerce platforms</li>
</ul>

---
layout: default
---

<div class="routes-code">

```ts
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'hydrate', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
```

</div>

<!--
Per avere disponibile l'hybrid rendering:

ng new --ssr

o

ng add @angular/ssr
-->

---
layout: center
---

<div class="statement">Hydration</div>

---
layout: center
---

<div class="definition">

<span class="accent">Hydration</span> is the process that restores the <span class="accent">server-side</span> rendered application on the client. This includes things like reusing the server rendered DOM structures, persisting the application state, transferring application data that was retrieved already by the server, and other processes.

</div>

---
layout: center
---

```ts {9}
import {
  bootstrapApplication,
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';
...

bootstrapApplication(AppComponent, {
  providers:[provideClientHydration()]
});
```

<!--
La hydration migliora le prestazioni dell'applicazione evitando di ricreare da zero i nodi del DOM. Angular cerca di riutilizzare gli elementi HTML già presenti, confrontandoli con la struttura dell'applicazione durante l'esecuzione.

✅ Vantaggi principali:
Migliora le metriche di Core Web Vitals:

FID (First Input Delay)

LCP (Largest Contentful Paint)

CLS (Cumulative Layout Shift)

Migliora anche il SEO, grazie a un caricamento più fluido e veloce.

⚠️ Senza hydration:
Le app Angular renderizzate lato server distruggono e ricreano il DOM, causando:

Sfarfallio visibile dell’interfaccia

Peggioramento delle metriche come LCP e CLS

✅ Attivando la hydration, Angular riutilizza il DOM esistente, evitando lo sfarfallio e migliorando l’esperienza utente.
-->

---
layout: center
---

```ts {9}
import {
  bootstrapApplication,
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';
// ...

bootstrapApplication(AppComponent, {
  providers:[provideClientHydration(withIncrementalHydration())]
});
```

<!--
La hydration incrementale è un miglioramento delle prestazioni che si basa sulla hydration completa dell'applicazione. Permette di creare bundle iniziali più piccoli, mantenendo comunque un’esperienza utente simile a quella della hydration completa.

⚡ Vantaggi principali:
Bundle più leggeri → tempi di caricamento iniziale più rapidi

Miglioramento delle metriche Core Web Vitals:

FID (First Input Delay)

CLS (Cumulative Layout Shift)

✅ In sintesi: migliora la velocità e la stabilità visiva dell’app, offrendo un caricamento più fluido e reattivo.

Ed è da questo momento in poi che il @defer ha un altro potentissimo potere e diventa...
-->

---
layout: image
image: /42-super-defer.png
footer: false
---

---
layout: center
---

```angular-html {1}
@defer (hydrate on interaction) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```

<!--
La keyword hydrate è adesso disponibile e fà si che  tutto quello all'interno del blocco @defer venga idratato al trigger specifico.
-->

---
layout: center
---

```angular-html {1}
@defer (on idle; hydrate on interaction) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```

<!--
Le due tipologie di triggers (normali ed hydrate) possono essere usati insieme all'interno di un blocco @defer. 

La "hydration" è una tecnica per ottimizzare il caricamento iniziale della pagina. Quindi, questi trigger speciali si attivano solo durante il primo caricamento.

Durante il caricamento iniziale, viene usato il trigger "hydrate on interaction", cioè l'idratazione (attivazione del componente) avviene quando l'utente interagisce con il componente <calendar-cmp />.

Nei caricamenti successivi (come quando si naviga tra le pagine tramite routerLink), si usa invece il trigger normale, ad esempio "on idle", che attiva il componente quando il browser è inattivo.
-->

---
layout: center
class: table-slide
---

| Title | Description |
|---|---|
| <span class="accent">hydrate on idle</span> | Triggers when the browser is idle |
| <span class="accent">hydrate on viewport</span> | Triggers when specified content enters the viewport |
| <span class="accent">hydrate on interaction</span> | Triggers when the user interacts with specified element |
| <span class="accent">hydrate on hover</span> | Triggers when the mouse hovers over specified area |
| <span class="accent">hydrate on immediate</span> | Triggers immediately after non-deferred content has finished rendering |
| <span class="accent">hydrate on timer</span> | Triggers after a specific duration |
| <span class="accent">hydrate on when</span> | Custom conditional expression and loads the deferrable view's dependencies and hydrates the content when the condition becomes truthy. |
| <span class="accent">hydrate on never</span> | Allows users to specify that the content in the defer block should remain dehydrated indefinitely, effectively becoming static content |

<!--
I trigger dell'hydrate sono gli stessi della sua versione "base", con la sola differenza che qui non serve un ancora esterna, come nel caso visto prima con il trigger on interaction.

Questo perchè è il componente stesso a funzionare da punto d'interazione.
-->

---
layout: center
---

```angular-html
@defer (hydrate on interaction) {
  <parent-block-cmp />
  @defer (hydrate on hover) {
    <child-block-cmp />
  } @placeholder {
    <div>Child placeholder</div>
  }
} @placeholder{
  <div>Parent Placeholder</div>
}
```

---
layout: center
---

```angular-html {1,3}
@defer (hydrate on interaction) {
  <parent-block-cmp />
  @defer (hydrate on hover) {
    <child-block-cmp />
  } @placeholder {
    <div>Child placeholder</div>
  }
} @placeholder{
  <div>Parent Placeholder</div>
}
```

<!--
Il sistema di componenti e dipendenze di Angular è gerarchico, quindi per idratare un componente è necessario idratare anche tutti i suoi componenti padre.

👉 Se l'idratazione viene attivata per un blocco @defer figlio (che fa parte di una catena annidata di blocchi @defer non ancora idratati), Angular avvia l'idratazione dal primo blocco @defer più in alto e procede verso il basso fino al figlio attivato, seguendo l'ordine gerarchico.
-->

---
layout: center
class: code-wide
---

```ts {9}
import {
  bootstrapApplication,
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';
// ...

bootstrapApplication(AppComponent, {
  // withIncrementalHydration() includes withEventReplay()
  providers:[provideClientHydration(withIncrementalHydration())]
});
```

<!--
Event Replay è una funzionalità che migliora l’esperienza utente catturando gli eventi (come clic o interazioni) che avvengono prima che il processo di hydration sia completato. Questi eventi vengono poi riprodotti, così da non perdere nessuna interazione.

📌 Le tre fasi principali:
Cattura delle interazioni

Prima della hydration, vengono registrati tutti gli eventi dell’utente (clic, mouseover, ecc.).

Memorizzazione

Un sistema chiamato Event Contract conserva in memoria questi eventi per poterli riutilizzare.

Rilancio degli eventi

Dopo che la hydration è completata, Angular riattiva gli eventi catturati.

👉 Supporta eventi nativi del browser come click, mouseover, focusin. Per approfondire, puoi consultare la documentazione della libreria JSAction, che gestisce questa funzionalità.
-->

---
layout: center
---

<div class="statement">DEMO</div>

---
layout: image
image: /50-map-conclusion.png
footer: false
---

---
layout: image
image: /51-rocket.png
footer: false
---

<!--
- Core Web Vitals (CWV)
- @defer
- Client Side Rendering (CSR)
- Static Site Generation (SSG) 
- Server Side Rendering (SSR)
- Hybrid Rendering
- Hydration
- Incremental Hydration
- Event Replay
-->

---
layout: center
footer: false
---

<div class="flex flex-row items-center gap-12 w-full">

  <div class="flex flex-col gap-5 flex-1">

  <div class="thank-you-title">Thank you</div>

Good things come to those who **<span class="accent">@defer</span>**.

**Giorgio Galassi** <br>
Senior Frontend Engineer @ Onpier

  <div class="tags">
    <span class="tag">Angular</span>
    <span class="tag">@defer</span>
    <span class="tag">Incremental Hydration</span>
  </div>

  <div class="flex items-start gap-8">
    <div class="flex flex-col items-center gap-2">
      <img src="/qrcode_allmylinks.png" alt="QR code to all my links" class="qr-code w-36 h-36" />
      <span class="text-sm caption">All my links</span>
    </div>
    <div class="flex flex-col justify-center gap-1 text-sm">
      <span><b>Slides</b><br>github.com/giorgiogalassi/talk-defer</span>
    </div>
  </div>

  </div>

  <div class="flex-shrink-0">
    <img src="/profile.png" alt="Giorgio Galassi" class="rounded-full w-72 h-72 object-cover" />
  </div>

</div>
