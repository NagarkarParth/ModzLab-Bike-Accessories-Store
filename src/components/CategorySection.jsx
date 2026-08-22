import "./CategorySection.css";
const categories = [
  "Helmet",
  "Exhaust",
  "Bend Pipe",
  "Fog Lights",
  "Bulbs",
  "Phone Holders",
  "Keychains",
  "Handle Grips",
  "Lever Protector",
  "Indicators",
  "Scratch Guards",
  "Riding Gloves",
  "Tank Pads",
  "Mirrors",
  "Switches",
  "Sprays",
  "Visors",
  "Radiator Grills",
  "Others",
];

function CategorySection() {
  return (
    <section id="categories" className="categories-section">
      <div className="section-heading">
        <p>SHOP BY CATEGORY</p>
        <h2>Find Your <span>Bike Gear</span></h2>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <div className="category-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <h3>{category}</h3>

            <span>Explore →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;