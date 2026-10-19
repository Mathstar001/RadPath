import { useEffect, useMemo, useState } from 'react'
import { getCategory, getProjection, projections } from './data/projections'
import './App.css'

function Logo() {
  return <a className="brand" href="#/" aria-label="RadPath home"><span className="brand-mark">R</span><span>Rad<span className="brand-light">Path</span><small>RADIOGRAPHY REFERENCE</small></span></a>
}

function SearchBar({ value, onChange }) {
  return <label className="search-box"><span className="search-icon" aria-hidden="true">/</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search chest projections..." aria-label="Search chest projections" /><kbd>Ctrl K</kbd></label>
}

function Header({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header"><div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Primary navigation"><a href="#/">Home</a><a className="active" href="#/category/chest">Chest</a></nav><div className="header-actions"><SearchBar value={search} onChange={setSearch} /><button className="icon-button" type="button" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button></div></div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#/" onClick={closeMenu}>Home</a><a className="active" href="#/category/chest" onClick={closeMenu}>Chest</a></nav>}</header>
}

function StatusPill({ children, tone = '' }) {
  return <span className={`status-pill ${tone}`}>{children}</span>
}

function ProjectionCard({ projection }) {
  return <a className="projection-card" href={`#/projection/${projection.id}`}><div className="card-top"><span className="card-kicker">CHEST</span><StatusPill tone={projection.verificationTone}>Needs verification</StatusPill></div><h3>{projection.name}</h3><p>{projection.purpose}</p><div className="card-footer"><span>Open reference</span><span aria-hidden="true">-&gt;</span></div></a>
}

function EmptyState({ query, onClear }) {
  return <div className="empty-state"><span className="empty-icon" aria-hidden="true">?</span><h2>No chest projections found</h2><p>No projection matches &quot;{query}&quot;. Search by projection name or alternative name.</p><button className="text-button" onClick={onClear}>Clear search</button></div>
}

function DiagramPlaceholder() {
  return <div className="diagram-placeholder"><div className="diagram-grid" /><div className="diagram-person"><span /><i /></div><div className="diagram-label">Positioning diagram<small>Original placeholder - replace after approval</small></div></div>
}

function Field({ label, children }) {
  return <div className="info-field"><dt>{label}</dt><dd>{children}</dd></div>
}

function DetailPage({ projection }) {
  return <div className="detail-page"><a className="back-button" href="#/category/chest">&lt;- Back to Chest</a><div className="detail-heading"><div><div className="eyebrow">CHEST / PROJECTION REFERENCE</div><h1>{projection.name}</h1><p>{projection.purpose}</p></div><StatusPill tone={projection.verificationTone}>{projection.verification}</StatusPill></div><div className="detail-grid"><main><section className="detail-card"><div className="section-heading"><span className="section-number">01</span><div><h2>Clinical context</h2><p>General educational guidance is shown separately from edition-specific verification.</p></div></div><dl className="field-list context-fields"><Field label="Clinical indications">{projection.indications}</Field><Field label="Patient preparation">{projection.preparation}</Field></dl></section><section className="detail-card"><div className="section-heading"><span className="section-number">02</span><div><h2>Positioning and technique</h2><p>Technical fields remain data-driven so approved corrections can be made without changing the interface.</p></div></div><div className="positioning-layout"><DiagramPlaceholder /><dl className="field-list"><Field label="Patient positioning">{projection.patientPositioning}</Field><Field label="Part positioning">{projection.partPositioning}</Field><Field label="Central ray">{projection.centralRay}</Field><Field label="SID and detector">{projection.sidDetector}</Field><Field label="Collimation and exposure">{projection.collimationExposure}</Field><Field label="Breathing instructions">{projection.breathing}</Field></dl></div></section><section className="detail-card"><div className="section-heading"><span className="section-number">03</span><div><h2>Image evaluation checklist</h2><p>Use departmental criteria and qualified clinical supervision for final evaluation.</p></div></div><ul className="check-list">{projection.characteristics.map((item) => <li key={item}><span>-</span>{item}</li>)}</ul><div className="radiograph-placeholder"><span>Example radiograph placeholder</span><small>No approved PA chest radiograph supplied. Do not use AI-generated radiographs as authoritative examples.</small></div></section></main><aside><section className="side-card"><h2>Common positioning faults</h2><div className="fault-table-wrap"><table className="fault-table"><thead><tr><th>Fault</th><th>Effect</th><th>Remedy</th></tr></thead><tbody>{projection.faults.map((item) => <tr key={item.fault}><td>{item.fault}</td><td>{item.effect}</td><td>{item.remedy}</td></tr>)}</tbody></table></div></section><section className="side-card"><h2>References and verification</h2>{projection.references.map((reference) => <p className="reference" key={reference}>{reference}</p>)}<div className="verification-note"><span>!</span><p><strong>Needs clinical verification</strong><br />Departmental protocols and qualified clinical supervision take precedence. This page must be checked before clinical use.</p></div></section></aside></div></div>
}

function HomePage() {
  return <><section className="home-hero"><div className="home-hero-inner"><div className="eyebrow">RADIOGRAPHY REFERENCE LIBRARY</div><h1>Clear references for<br /><em>better radiography.</em></h1><p>RadPath is a focused, evolving reference for radiography students and qualified radiographers.</p><a className="primary-button" href="#/category/chest">Explore Chest <span>-&gt;</span></a></div><div className="hero-mark" aria-hidden="true">R<span /></div></section><section className="home-content"><div className="section-intro"><div><div className="eyebrow">START HERE</div><h2>Choose an anatomical category</h2></div><span className="content-note">Chest is the first active section</span></div><div className="home-category-card"><span className="category-letter">C</span><div><h3>Chest</h3><p>Conventional chest projections, organized as reusable reference pages.</p></div><a href="#/category/chest" className="category-link">Open Chest -&gt;</a></div><p className="scope-note">Other categories will be added as their content is reviewed. The library does not claim to be complete.</p></section></>
}

function ChestPage({ search, setSearch }) {
  const filtered = useMemo(() => { const term = search.trim().toLowerCase(); if (!term) return projections; return projections.filter((projection) => [projection.name, ...projection.aliases].join(' ').toLowerCase().includes(term)) }, [search])
  return <main className="content chest-page"><div className="page-topline"><a className="back-button" href="#/">&lt;- Home</a><StatusPill tone="warning">9 initial entries</StatusPill></div><div className="page-heading"><div><div className="eyebrow">ANATOMICAL CATEGORY / CHEST</div><h1>Chest projections</h1><p>Conventional chest radiographic projections in a clear, expandable reference format.</p></div><div className="page-search"><SearchBar value={search} onChange={setSearch} /><small>Search names and alternative names</small></div></div><div className="verification-banner"><span>!</span><p><strong>Content status:</strong> all initial entries are marked Needs clinical verification. Technical details must be checked against an appropriate approved reference before use.</p></div>{filtered.length ? <div className="projection-grid chest-grid">{filtered.map((projection) => <ProjectionCard key={projection.id} projection={projection} />)}</div> : <EmptyState query={search} onClear={() => setSearch('')} />}</main>
}

function CategoryPage({ category }) {
  return <main className="content category-page"><a className="back-button" href="#/">&lt;- Home</a><div className="eyebrow">ANATOMICAL CATEGORY</div><h1>{category.name}</h1><p className="category-lede">{category.description}. This section has not been populated yet.</p><div className="empty-state"><h2>Content is being reviewed</h2><p>RadPath will publish this category only when its reference records have been checked.</p></div></main>
}

function App() {
  const [search, setSearch] = useState('')
  const [hash, setHash] = useState(window.location.hash || '#/')
  useEffect(() => { const onHashChange = () => setHash(window.location.hash || '#/'); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange) }, [])
  const projection = hash.startsWith('#/projection/') ? getProjection(hash.replace('#/projection/', '')) : null
  const categoryId = hash.startsWith('#/category/') ? hash.replace('#/category/', '') : null
  const category = categoryId ? getCategory(categoryId) : null
  return <><Header search={search} setSearch={setSearch} />{projection ? <DetailPage projection={projection} /> : category?.id === 'chest' ? <ChestPage search={search} setSearch={setSearch} /> : category ? <CategoryPage category={category} /> : <HomePage />}<footer><Logo /><span>Educational reference interface - content requires clinical verification</span><a href="#/category/chest">Chest projections -&gt;</a></footer></>
}

export default App
