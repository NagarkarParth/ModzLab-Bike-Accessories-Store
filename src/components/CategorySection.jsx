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


function CategorySection({
  selectedCategory,
  onCategorySelect,
}) {

  return (

    <section
      id="categories"
      className="categories-section"
    >

      {/* =================================================
          SECTION HEADING
      ================================================= */}

      <div className="section-heading">

        <p>
          SHOP BY CATEGORY
        </p>

        <h2>
          Find Your <span>Bike Gear</span>
        </h2>

      </div>


      {/* =================================================
          ALL PRODUCTS
      ================================================= */}

      <div className="categories-grid">

        <div
          className={`category-card ${
            selectedCategory === "All"
              ? "active"
              : ""
          }`}
          onClick={() =>
            onCategorySelect("All")
          }
        >

          <div className="category-number">
            00
          </div>

          <h3>
            All Products
          </h3>

          <span>
            Explore →
          </span>

        </div>


        {/* =================================================
            CATEGORIES
        ================================================= */}

        {categories.map(
          (category, index) => (

            <div
              className={`category-card ${
                selectedCategory === category
                  ? "active"
                  : ""
              }`}
              key={category}
              onClick={() =>
                onCategorySelect(category)
              }
            >

              <div className="category-number">

                {String(index + 1).padStart(
                  2,
                  "0"
                )}

              </div>


              <h3>
                {category}
              </h3>


              <span>
                Explore →
              </span>

            </div>

          )
        )}

      </div>

    </section>

  );

}

export default CategorySection;