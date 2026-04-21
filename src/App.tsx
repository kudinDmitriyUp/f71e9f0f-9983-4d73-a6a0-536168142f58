import AboutTextSplit from '@/components/sections/about/AboutTextSplit';
import ContactSplitForm from '@/components/sections/contact/ContactSplitForm';
import FaqSimple from '@/components/sections/faq/FaqSimple';
import FeaturesTimelineCards from '@/components/sections/features/FeaturesTimelineCards';
import FooterSimpleCard from '@/components/sections/footer/FooterSimpleCard';
import HeroBrandCarousel from '@/components/sections/hero/HeroBrandCarousel';
import MetricsIconCards from '@/components/sections/metrics/MetricsIconCards';
import NavbarCentered from '@/components/ui/NavbarCentered';
import ProductMediaCards from '@/components/sections/product/ProductMediaCards';
import TestimonialTrustCard from '@/components/sections/testimonial/TestimonialTrustCard';
import { Coffee, Heart, Users } from "lucide-react";

export default function App() {
  return (
    <>
  <div id="nav" data-section="nav">
      <NavbarCentered
      logo="Look man"
      navItems={[
        {
          name: "About",
          href: "#about",
        },
        {
          name: "Menu",
          href: "#menu",
        },
        {
          name: "Contact",
          href: "#contact",
        },
      ]}
      ctaButton={{
        text: "Visit Us",
        href: "#contact",
      }}
    />
  </div>

  <div id="hero" data-section="hero">
      <HeroBrandCarousel
      brand="Look man"
      description="Your daily companion for exceptional coffee moments. Brewed with love, served with care."
      primaryButton={{
        text: "Our Menu",
        href: "#menu",
      }}
      secondaryButton={{
        text: "Learn More",
        href: "#about",
      }}
      items={[
        {
          imageSrc: "http://img.b2bpic.net/free-photo/young-woman-eating-delicious-tiramisu-cafe_1303-25273.jpg",
        },
        {
          imageSrc: "http://img.b2bpic.net/free-photo/top-view-tasty-cup-coffee_1203-1630.jpg",
        },
        {
          imageSrc: "http://img.b2bpic.net/free-photo/bird-city-sparrow-sitting-table-outdoor-cafe_1153-4662.jpg",
        },
        {
          imageSrc: "http://img.b2bpic.net/free-photo/woman-drinking-coffee-stylish-bag-table-wearing-grey-dress-orange-plaid-enjoying-cozy-morning-cafe_273443-2545.jpg",
        },
        {
          imageSrc: "http://img.b2bpic.net/free-photo/young-attractive-business-man-cafe-works-laptop-drinks-coffee_1321-1439.jpg",
        },
        {
          imageSrc: "http://img.b2bpic.net/free-photo/sieve-near-coffee-beans_23-2147747271.jpg",
        },
      ]}
    />
  </div>

  <div id="about" data-section="about">
      <AboutTextSplit
      title="A Coffee Ritual"
      descriptions={[
        "Born from a passion for quality and simplicity, 'Look man' is where fine coffee meets warm conversation. We believe every cup tells a story, and every visit is a chance to pause, reflect, and enjoy the moment.",
        "Our beans are responsibly sourced and meticulously roasted to perfection, ensuring that every sip highlights the unique characteristics of our origin-grown harvests. From the first pour to the final drop, we prioritize craftsmanship over convenience.",
      ]}
      primaryButton={{
        text: "Our Story",
        href: "#",
      }}
    />
  </div>

  <div id="features" data-section="features">
      <FeaturesTimelineCards
      tag="Our Process"
      title="From Seed to Sip"
      description="Excellence isn't an accident. It's a calculated journey through every stage of preparation."
      items={[
        {
          title: "Sourcing",
          description: "We hand-select only the finest specialty beans from sustainable farms worldwide.",
          imageSrc: "http://img.b2bpic.net/free-photo/closeup-shot-cafe-wooden-table-with-jar-decorative-flowers-against-blurred-background_181624-59999.jpg",
        },
        {
          title: "Roasting",
          description: "Small-batch roasting techniques that preserve the unique flavor profiles of every bean.",
          imageSrc: "http://img.b2bpic.net/free-photo/selective-focus-roasted-coffee-bean-lights-with-blurry-backgroun_181624-59643.jpg",
        },
        {
          title: "Brewing",
          description: "Expert baristas using precision equipment to deliver a consistent experience every time.",
          imageSrc: "http://img.b2bpic.net/free-photo/young-adults-having-fun-together_23-2149278965.jpg",
        },
      ]}
    />
  </div>

  <div id="menu" data-section="menu">
      <ProductMediaCards
      tag="Featured Items"
      title="Our Signature Brews"
      description="Discover your new favorite from our curated selection of hot and iced refreshments."
      products={[
        {
          name: "Signature Espresso",
          price: "$3.50",
          imageSrc: "http://img.b2bpic.net/free-photo/coffee-machine-with-transparent-glass-coffee-shop_23-2148824456.jpg",
        },
        {
          name: "Velvety Flat White",
          price: "$4.50",
          imageSrc: "http://img.b2bpic.net/free-photo/delicious-cappuccino-with-beautiful-painting-foam_181624-8920.jpg",
        },
        {
          name: "Creamy Cappuccino",
          price: "$4.25",
          imageSrc: "http://img.b2bpic.net/free-photo/food-retro-breakfast-cup-restaurant_1172-468.jpg",
        },
        {
          name: "Iced Americano",
          price: "$4.00",
          imageSrc: "http://img.b2bpic.net/free-photo/woman-with-hat-drinking-coffee_23-2148276105.jpg",
        },
        {
          name: "Artisan Croissant",
          price: "$3.75",
          imageSrc: "http://img.b2bpic.net/free-photo/coffee-still-life_23-2148116853.jpg",
        },
        {
          name: "Blueberry Muffin",
          price: "$3.50",
          imageSrc: "http://img.b2bpic.net/free-photo/high-angle-fingers-pointing-dessert_23-2149356030.jpg",
        },
      ]}
    />
  </div>

  <div id="testimonials" data-section="testimonials">
      <TestimonialTrustCard
      quote="The most inviting place to start my morning. The baristas are skilled and the atmosphere is unmatched."
      rating={5}
      author="Mark S., Daily Local"
      avatars={[
        {
          name: "Sarah J.",
          imageSrc: "http://img.b2bpic.net/free-photo/vertical-shot-friendly-asian-girl-smiling-serving-coffee-barista-giving-you-cup-coffee_1258-197388.jpg",
        },
        {
          name: "David K.",
          imageSrc: "http://img.b2bpic.net/free-photo/young-businesswoman-working-computer-outside-cafe_1303-18757.jpg",
        },
        {
          name: "Emily R.",
          imageSrc: "http://img.b2bpic.net/free-photo/this-is-my-new-profile-social-network_329181-2899.jpg",
        },
        {
          name: "Michael B.",
          imageSrc: "http://img.b2bpic.net/free-photo/girl-with-cheesecake_1303-3947.jpg",
        },
        {
          name: "Jessica L.",
          imageSrc: "http://img.b2bpic.net/free-photo/attractive-young-woman-sitting-cafe-holding-takeaway-coffee-cup_23-2148148111.jpg",
        },
      ]}
    />
  </div>

  <div id="metrics" data-section="metrics">
      <MetricsIconCards
      tag="Our Impact"
      title="By The Numbers"
      description="We are proud of our contributions to the local coffee community."
      metrics={[
        {
          icon: Coffee,
          title: "Cups Brewed",
          value: "50K+",
        },
        {
          icon: Heart,
          title: "Happy Customers",
          value: "12K+",
        },
        {
          icon: Users,
          title: "Local Events",
          value: "150+",
        },
      ]}
    />
  </div>

  <div id="faq" data-section="faq">
      <FaqSimple
      tag="Ask Us"
      title="Common Questions"
      description="Find answers to our most popular inquiries here."
      items={[
        {
          question: "Do you offer decaf options?",
          answer: "Yes, we provide premium Swiss Water processed decaf for all our espresso-based drinks.",
        },
        {
          question: "Can I work in your cafe?",
          answer: "Absolutely! We provide free Wi-Fi and ample seating for our coffee-loving professionals.",
        },
        {
          question: "Do you offer catering services?",
          answer: "Yes, get in touch with us to host 'Look man' at your next corporate event or gathering.",
        },
      ]}
    />
  </div>

  <div id="contact" data-section="contact">
      <ContactSplitForm
      tag="Get in Touch"
      title="Visit Us Today"
      description="Have questions or need to reserve a table? Send us a message and we'll reply as soon as the next batch finishes."
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Your Name",
          required: true,
        },
        {
          name: "email",
          type: "email",
          placeholder: "Email Address",
          required: true,
        },
      ]}
      textarea={{
        name: "message",
        placeholder: "How can we help you?",
        rows: 4,
        required: true,
      }}
      buttonText="Send Message"
      imageSrc="http://img.b2bpic.net/free-photo/table-ready-lunch_1162-65.jpg"
    />
  </div>

  <div id="footer" data-section="footer">
      <FooterSimpleCard
      brand="Look man"
      columns={[
        {
          title: "Navigation",
          items: [
            {
              label: "About",
              href: "#about",
            },
            {
              label: "Menu",
              href: "#menu",
            },
            {
              label: "Contact",
              href: "#contact",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Instagram",
              href: "#",
            },
            {
              label: "Twitter",
              href: "#",
            },
            {
              label: "Facebook",
              href: "#",
            },
          ],
        },
      ]}
      copyright="© 2024 Look man Coffeeshop. All rights reserved."
      links={[
        {
          label: "Privacy Policy",
          href: "#",
        },
        {
          label: "Terms of Service",
          href: "#",
        },
      ]}
    />
  </div>
    </>
  );
}
