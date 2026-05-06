import { useState, useEffect, useRef } from "react";
import { ExternalLink, Youtube, Menu, X, ChevronRight, Instagram, Linkedin, Mail } from "lucide-react";
import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import familyPhoto from "@/imports/FamilyPic.jpg";
import datavizDadImage from "@/imports/Artboard_1.png";
import improvTeamPhoto from "@/imports/WholeTeam.jpg";

type Section = "dataviz" | "horror" | "improv" | "about";

interface Publication {
  year: number;
  title: string;
  venue: string;
  url?: string;
  free?: boolean;
  type: "story" | "nonfiction";
  links?: { label: string; url: string }[];
}

interface ImprovTeam {
  name: string;
  description: string;
  url?: string;
}

const publications: Publication[] = [
  {
    type: "nonfiction",
    year: 2021,
    title: "Finding a Through Line, or My Creative Process Is a Mess, So Is Life, and That's Okay (Probably)",
    venue: "Nightingale / Medium",
    url: "https://medium.com/nightingale/finding-a-through-line-or-my-creative-process-is-a-mess-so-is-life-and-thats-okay-probably-66c83bf32961",
    free: true,
  },
  {
    type: "story",
    year: 2020,
    title: "Jonathan Shaw's Studio",
    venue: "Borderlands 7",
    url: "https://www.goodreads.com/book/show/60602705-borderlands-7",
  },
  {
    type: "story",
    year: 2019,
    title: "K is for Kin",
    venue: "F is for Fairy",
    url: "https://www.amazon.com/Fairy-Alphabet-Anthologies-Book-ebook/dp/B07NF5ZKK6/ref=sr_1_1?keywords=f+is+for+fairy&qid=1563913409&s=digital-text&sr=1-1",
  },
  {
    type: "story",
    year: 2018,
    title: "The Boy",
    venue: "Tales from the Lake Vol. 5",
    url: "https://www.amazon.com/dp/B07JLVTRK7?ref_=pe_3052080_276849420",
  },
  {
    type: "story",
    year: 2018,
    title: "P is for Patience",
    venue: "E is for Evil",
    url: "https://www.amazon.com/Evil-Alphabet-Anthologies-Book-ebook/dp/B07B4QPDQ1/ref=sr_1_1?keywords=E+is+for+Evil&qid=1563913351&s=digital-text&sr=1-1",
  },
  {
    type: "story",
    year: 2017,
    title: "The Familiar",
    venue: "Nightscript",
    links: [
      { label: "Kindle", url: "https://www.amazon.com/Nightscript-3-C-M-Muller-ebook/dp/B075F568H8/" },
      { label: "Paperback", url: "https://www.amazon.com/Nightscript-3-C-M-Muller/dp/197614048X/" },
    ],
  },
  {
    type: "story",
    year: 2017,
    title: "Three Thousand, Two Hundred and Eighty Miles to Boston",
    venue: "Phobos Magazine",
    url: "https://www.amazon.com/dp/1387045377/",
  },
  {
    type: "story",
    year: 2017,
    title: "V is for Vermin",
    venue: "D is for Dinosaur",
    links: [
      { label: "Kindle", url: "https://www.amazon.com/Dinosaur-Alphabet-Anthologies-Book-ebook/dp/B01N7J28YP" },
      { label: "Paperback", url: "https://www.amazon.com/D-Dinosaur-Alphabet-Anthologies-4/dp/1988233151/" },
    ],
  },
  {
    type: "story",
    year: 2016,
    title: "2 AM at a Motel in the City",
    venue: "Every Day Fiction",
    url: "http://everydayfiction.com/2-am-at-a-motel-in-the-city-by-cory-cone/",
    free: true,
  },
  {
    type: "story",
    year: 2015,
    title: "L is for Leak",
    venue: "B is for Broken",
  },
  {
    type: "story",
    year: 2015,
    title: "The Nest",
    venue: "Shrieks and Shivers from The Horror Zine",
    url: "http://www.amazon.com/gp/product/0692324577",
  },
  {
    type: "story",
    year: 2015,
    title: "The Best Cheesecake in the Universe",
    venue: "2015 Young Explorer's Adventure Guide",
    url: "http://www.amazon.com/2015-Young-Explorers-Adventure-Guide-ebook/dp/B00RR2WYIU",
  },
  {
    type: "story",
    year: 2014,
    title: "The Sound of Rain",
    venue: "The Avenue",
  },
  {
    type: "story",
    year: 2014,
    title: "Just Up the Beach",
    venue: "T. Gene Davis's Speculative Blog",
    url: "http://freesciencefiction.com/tale/just-up-the-beach/",
    free: true,
  },
  {
    type: "story",
    year: 2014,
    title: "T is for Taxidermy",
    venue: "A is for Apocalypse",
    links: [
      { label: "Kindle", url: "http://www.amazon.com/A-Apocalypse-Rhonda-Parrish-ebook/dp/B00MSZLF9U" },
      { label: "Paperback", url: "http://www.amazon.com/A-Apocalypse-Rhonda-Parrish/dp/0993699014/" },
    ],
  },
  {
    type: "story",
    year: 2013,
    title: "Autumn in the Woods",
    venue: "The Colored Lens",
    url: "http://thecoloredlens.com/?p=4426",
    free: true,
  },
  {
    type: "story",
    year: 2013,
    title: "Compassion, During and After the Fall",
    venue: "Niteblade",
    url: "https://www.amazon.com/Forbidden-Island-Niteblade-Magazine-Book-ebook/dp/B00D6013D4/",
  },
  {
    type: "story",
    year: 2013,
    title: "Resetting Alexandra",
    venue: "Every Day Fiction",
    url: "http://www.everydayfiction.com/resetting-alexandra-by-cory-cone/",
    free: true,
  },
  {
    type: "story",
    year: 2013,
    title: "Sunday Morning, Two Weeks Later",
    venue: "Apocrypha and Abstractions",
    url: "http://apocryphaandabstractions.wordpress.com/2013/04/25/sunday-morning-two-weeks-later-by-cory-cone/",
    free: true,
  },
  {
    type: "story",
    year: 2013,
    title: "Gremlin",
    venue: "101 Fiction",
  },
  {
    type: "story",
    year: 2013,
    title: "The Black Pageant",
    venue: "Grim Corps Magazine",
  },
  {
    type: "story",
    year: 2013,
    title: "Dusty's Pint",
    venue: "eFiction Horror",
  },
];

const improvTeams: ImprovTeam[] = [
  {
    name: "TableTop Live!",
    description: "A Dungeons-and-Dragons-inspired (but legally distinct) improvised comedy show in Baltimore, MD.",
    url: "https://www.instagram.com/tabletopliveimprov/",
  },
  {
    name: "Chairgy",
    description: "Two locations, 1 minute scenes, lots of chairs.",
  },
  {
    name: "First Date",
    description: "Conservatory Team at BIG doing Pattern Game Harolds!",
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("dataviz");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionRefs = {
    dataviz: useRef<HTMLElement>(null),
    horror: useRef<HTMLElement>(null),
    improv: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections: Section[] = ["dataviz", "horror", "improv", "about"];
      for (const id of sections) {
        const el = sectionRefs[id].current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (section: Section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const navItems: { id: Section; label: string; color: string }[] = [
    { id: "dataviz", label: "DataViz", color: "text-[#00d4b8]" },
    { id: "horror", label: "Horror", color: "text-[#c0392b]" },
    { id: "improv", label: "Improv", color: "text-[#f0a020]" },
    { id: "about", label: "About", color: "text-foreground" },
  ];

  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  const stories = publications.filter((p) => p.type === "story");
  const nonfiction = publications.filter((p) => p.type === "nonfiction");

  return (
    <div className="min-h-screen bg-background text-foreground font-[Inter,sans-serif] overflow-x-hidden">
      {/* Mesh background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(0,212,184,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 90% 100%, rgba(192,57,43,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(240,160,32,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-['DM_Serif_Display',serif] text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            Cory Cone
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
                  activeSection === item.id
                    ? item.color + " opacity-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-b border-border px-6 pb-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left text-sm font-medium tracking-wider uppercase py-2 transition-colors ${item.color}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="pt-36 pb-24 px-6 max-w-5xl mx-auto relative">
        <p className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
          corycone.com
        </p>
        <h1 className="font-['DM_Serif_Display',serif] text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
          <span className="block">Writer.</span>
          <span className="block">
            Data{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4b8, #00a896)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nerd.
            </span>
          </span>
          <span className="block text-muted-foreground/60">Improviser.</span>
        </h1>
        <p className="text-muted-foreground max-w-md text-lg leading-relaxed font-light">
          Horror fiction, data visualization, and the occasional "yes, and." Often in the same week.
        </p>
        <div className="flex gap-4 mt-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 text-sm font-medium ${item.color} hover:opacity-80 transition-opacity`}
            >
              {item.label}
              <ChevronRight size={14} />
            </button>
          ))}
        </div>
      </header>

      {/* Divider */}
      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── DataViz Section ─────────────────────────────────────── */}
      <section
        ref={sectionRefs.dataviz}
        id="dataviz"
        className="py-24 px-6 max-w-5xl mx-auto scroll-mt-20"
      >
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-[#00d4b8] uppercase">
            01
          </span>
          <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl">DataViz</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-muted-foreground text-lg leading-relaxed font-light mb-6">
              Short, data-driven stories that find the surprising, the strange, and the human in real datasets.
              The DataViz Dad channel turns numbers into narratives.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light mb-10">
              The channel also includes the occasional dataviz tutorial.
            </p>
            <a
              href="https://www.youtube.com/@DataVizDad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#00d4b8]/10 border border-[#00d4b8]/20 text-[#00d4b8] px-6 py-3 rounded-sm text-sm font-medium tracking-wide hover:bg-[#00d4b8]/20 transition-colors"
            >
              <Youtube size={16} />
              DataViz Dad on YouTube
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>

          {/* YouTube card */}
          <div className="relative group">
            <a
              href="https://www.youtube.com/@DataVizDad"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video bg-[#0a0f0f] rounded-sm overflow-hidden border border-border relative"
            >
              <img
                src={datavizDadImage}
                alt="DataViz Dad - Short, surprising stories from real data"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── Horror Section ──────────────────────────────────────── */}
      <section
        ref={sectionRefs.horror}
        id="horror"
        className="py-24 px-6 max-w-5xl mx-auto scroll-mt-20"
      >
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-[#c0392b] uppercase">
            02
          </span>
          <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl">Horror Fiction</h2>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="text-muted-foreground leading-relaxed font-light mb-4">
              Short fiction published in anthologies and magazines since 2013. Mostly dark, often weird. One is about a cheesecake.
            </p>
          </div>

          <div className="space-y-10">
            {/* Nonfiction */}
            <div>
              <h3 className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-[#c0392b] uppercase mb-5">
                Nonfiction
              </h3>
              {nonfiction.map((pub, i) => (
                <PublicationRow key={i} pub={pub} accentColor="#c0392b" />
              ))}
            </div>

            {/* Short stories by year */}
            <div>
              <h3 className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-[#c0392b] uppercase mb-5">
                Short Stories
              </h3>
              <div className="space-y-0">
                {years
                  .filter((y) => stories.some((s) => s.year === y))
                  .map((year) => (
                    <YearGroup
                      key={year}
                      year={year}
                      pubs={stories.filter((s) => s.year === year)}
                      accentColor="#c0392b"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── Improv Section ──────────────────────────────────────── */}
      <section
        ref={sectionRefs.improv}
        id="improv"
        className="py-24 px-6 max-w-5xl mx-auto scroll-mt-20"
      >
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-[#f0a020] uppercase">
            03
          </span>
          <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl">Improv</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-muted-foreground text-lg leading-relaxed font-light mb-6">
              Come see me doing live comedy in Baltimore City! Currently performing with three teams at{" "}
              <a
                href="https://www.bigimprov.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0a020] hover:opacity-80 transition-opacity"
              >
                Baltimore Improv Group
              </a>.
            </p>
            <div className="aspect-video bg-muted rounded-sm overflow-hidden border border-border">
              <img
                src={improvTeamPhoto}
                alt="Improv team photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-px">
            {improvTeams.map((team, i) => (
              <div
                key={i}
                className="group border border-border bg-card hover:bg-secondary transition-colors duration-200 p-6 first:rounded-t-sm last:rounded-b-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {team.url ? (
                      <a
                        href={team.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['DM_Serif_Display',serif] text-xl mb-2 group-hover:text-[#f0a020] transition-colors inline-flex items-center gap-2"
                      >
                        {team.name}
                        <ExternalLink size={14} className="opacity-60" />
                      </a>
                    ) : (
                      <h3 className="font-['DM_Serif_Display',serif] text-xl mb-2 group-hover:text-[#f0a020] transition-colors">
                        {team.name}
                      </h3>
                    )}
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">
                      {team.description}
                    </p>
                  </div>
                  <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[#f0a020]/60 tracking-widest uppercase mt-1 shrink-0">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border max-w-5xl mx-auto" />

      {/* ── About Section ───────────────────────────────────────── */}
      <section
        ref={sectionRefs.about}
        id="about"
        className="py-24 px-6 max-w-5xl mx-auto scroll-mt-20"
      >
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-['IBM_Plex_Mono',monospace] text-xs tracking-[0.2em] text-muted-foreground uppercase">
            04
          </span>
          <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl">About</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="rounded-sm overflow-hidden border border-border bg-muted aspect-[16/9]">
              <ImageWithFallback
                src={familyPhoto}
                alt="Cory and his family — Cory, his wife, and their son, all wearing sunglasses"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-['IBM_Plex_Mono',monospace] text-xs text-muted-foreground mt-3 tracking-wider">
              Cory &amp; his family
            </p>
          </div>

          {/* Bio + contact */}
          <div>
            <p className="text-foreground/90 leading-relaxed font-light mb-5">
              I live in Baltimore, Maryland with my wife and son. I earned a BFA in Painting from the Maryland Institute College of Art in 2007, and later returned to MICA for a Master's in Data Analytics and Visualization.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light mb-5">
              My work has moved across art, technology, storytelling, and data. I've worked as a data visualization specialist and served as Lead of Dashboarding and Insights at Accenture Federal Services, helping teams turn complex information into clearer, more useful visual stories. I now work as a developer back at MICA, building tools and systems that support students, faculty, and staff.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light mb-10">
              Outside of work, I write fiction and perform improv. Most of what I make, in one way or another, comes back to the same basic interest: using stories, images, and systems to make sense of things.
            </p>

            <div className="space-y-3">
              <a
                href="http://www.instagram.com/corycone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Instagram size={15} className="shrink-0 group-hover:text-[#f0a020] transition-colors" />
                @corycone
              </a>
              <a
                href="https://www.linkedin.com/in/cory-cone-6a80175/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Linkedin size={15} className="shrink-0 group-hover:text-[#00d4b8] transition-colors" />
                cory-cone
              </a>
              <a
                href="mailto:corychristophercone@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail size={15} className="shrink-0 group-hover:text-[#c0392b] transition-colors" />
                corychristophercone@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="font-['DM_Serif_Display',serif] text-lg">Cory Cone</span>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs font-medium tracking-widest uppercase ${item.color} hover:opacity-80 transition-opacity`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="font-['IBM_Plex_Mono',monospace] text-xs text-muted-foreground">
            corycone.com
          </span>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0; }
        * { scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function YearGroup({
  year,
  pubs,
  accentColor,
}: {
  year: number;
  pubs: Publication[];
  accentColor: string;
}) {
  return (
    <div className="flex gap-6 py-5 border-b border-border last:border-0">
      <div
        className="font-['IBM_Plex_Mono',monospace] text-xs pt-0.5 shrink-0 w-10"
        style={{ color: accentColor + "99" }}
      >
        {year}
      </div>
      <div className="space-y-3 flex-1">
        {pubs.map((pub, i) => (
          <PublicationRow key={i} pub={pub} accentColor={accentColor} hideYear />
        ))}
      </div>
    </div>
  );
}

function PublicationRow({
  pub,
  accentColor,
  hideYear,
}: {
  pub: Publication;
  accentColor: string;
  hideYear?: boolean;
}) {
  return (
    <div className="group">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {!hideYear && (
          <span
            className="font-['IBM_Plex_Mono',monospace] text-xs shrink-0"
            style={{ color: accentColor + "80" }}
          >
            {pub.year}
          </span>
        )}
        {pub.url ? (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['DM_Serif_Display',serif] text-base leading-snug hover:opacity-80 transition-opacity"
            style={{ color: "inherit" }}
          >
            &ldquo;{pub.title}&rdquo;
          </a>
        ) : (
          <span className="font-['DM_Serif_Display',serif] text-base leading-snug text-muted-foreground/80">
            &ldquo;{pub.title}&rdquo;
          </span>
        )}
        <span className="text-muted-foreground text-sm">{pub.venue}</span>
        {pub.free && (
          <span
            className="font-['IBM_Plex_Mono',monospace] text-[10px] tracking-wider uppercase border px-1.5 py-0.5 rounded-sm"
            style={{ color: accentColor, borderColor: accentColor + "40" }}
          >
            free
          </span>
        )}
        {pub.links &&
          pub.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['IBM_Plex_Mono',monospace] text-[10px] tracking-wider uppercase border px-1.5 py-0.5 rounded-sm transition-colors hover:opacity-80"
              style={{ color: accentColor, borderColor: accentColor + "40" }}
            >
              {link.label}
            </a>
          ))}
      </div>
    </div>
  );
}
