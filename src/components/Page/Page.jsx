export default function Page({ page }) {
  if (!page || !page.length) return redirect("/404");

  const { id, title, content } = page[0];
  const renderTitle = title?.rendered || "";
  const renderContent = content?.rendered || "";
  console.log("page", page);

  return (
    <article
      id={id}
      className="entry author-consultapp page type-page status-publish"
      itemScope="itemscope"
      itemType="http://schema.org/CreativeWork"
    >
      <header className="entry-header">
        <h1 className="entry-title font-headlines" itemProp="headline">
          {renderTitle}
        </h1>
      </header>
      <div
        className="entry-content"
        itemProp="text"
        dangerouslySetInnerHTML={{ __html: renderContent }}
      ></div>
      <footer className="entry-footer small font-secondary"></footer>
    </article>
  );
}
