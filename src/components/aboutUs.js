import { appname, siteName } from "../services/setup";

const AboutUs = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{siteName}</h1>
      <p>
        is a multifaceted company that specializes in providing reliable
        software solutions for a wide range of services. Our innovative software
        platform enables individuals and businesses to conveniently engage in
        various transactions, including data reselling, airtime top-up, cable
        subscriptions, utility payments, and school scratch cards. We are
        dedicated to delivering efficient and user-friendly solutions that
        enhance the convenience and accessibility of these services.
      </p>

      <h2>Services:</h2>
      <ol>
        <li>
          <strong>Data Reselling:</strong>
          <p>
            Our software solution simplifies the process of data reselling,
            allowing businesses to efficiently distribute data packages to their
            customers. With our platform, you can easily manage inventory, track
            sales, and optimize pricing to maximize profits.
          </p>
        </li>
        <li>
          <strong>Airtime Top-up:</strong>
          <p>
            Stay connected effortlessly with our airtime top-up service. Our
            software platform supports quick and secure top-ups for mobile
            phones, enabling users to conveniently recharge their accounts from
            anywhere, at any time.
          </p>
        </li>
        <li>
          <strong>Cable Subscriptions:</strong>
          <p>
            Managing cable subscriptions is made easy with our software
            solution. Users can easily subscribe, renew, and manage their cable
            services seamlessly, eliminating the hassle of manual processes.
          </p>
        </li>
        <li>
          <strong>Utility Payments:</strong>
          <p>
            Our software platform simplifies the bill payment experience for
            various utilities, such as electricity, water, internet, and more.
            Users can securely and conveniently make payments, ensuring they
            never miss a due date.
          </p>
        </li>
        <li>
          <strong>School Scratch Cards:</strong>
          <p>
            We provide a convenient solution for the distribution and management
            of school scratch cards. Schools and educational institutions can
            effortlessly issue and track scratch cards for various purposes,
            such as exam registrations or fee payments.
          </p>
        </li>
      </ol>

      <h2>Why Choose Us?</h2>
      <ol>
        <li>
          <strong>Reliable Solutions:</strong>
          <p>
            We prioritize the reliability and stability of our software
            solutions, ensuring uninterrupted service and smooth user
            experiences.
          </p>
        </li>
        <li>
          <strong>Convenience:</strong>
          <p>
            Our user-friendly software platform is designed to provide utmost
            convenience to both businesses and end-users, streamlining
            transactions and enhancing accessibility.
          </p>
        </li>
        <li>
          <strong>Security:</strong>
          <p>
            We understand the importance of security and implement robust
            measures to protect sensitive data and transactions, ensuring peace
            of mind for our users.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default AboutUs;
