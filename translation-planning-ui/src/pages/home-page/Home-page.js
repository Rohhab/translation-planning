import React from 'react';
import { Helmet } from 'react-helmet';
import { TypeAnimation } from 'react-type-animation';
import './Home-page.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="HomePage__background"></div>
      <div className="HomePage__content">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="Typewiter">
          <TypeAnimation
            className="Typewriter"
            sequence={[
              `An average man cares that things are either true or false, but a warrior doesn't.`,
              3000,
              `An average man proceeds in a specific way with things that he knows are true, and in a different way with things that he knows are not true.`,
              3000,
              `If things are said to be true, he acts and believes in what he does. But if things are said to be untrue, he doesn't care to act, or he doesn't believe in what he does.`,
              3000,
              `A warrior, on the other hand, acts in both instances. If things are said to be true, he would act in order to do doing. If things are said to be untrue, he still would act in order to do not-doing.`,
              3000,
              `See what I mean?`,
              4000,
              '',
              1000,
            ]}
            speed={55}
            deletionSpeed={95}
            repeat={Infinity}
            style={{
              fontFamily: 'Gill Sans',
              fontSize: 40,
              textShadow: '2px 0 1px blue, -2px 0 1px #ff6600',
              color: '#80bfff',
            }}
          />
        </div>
      </div>
      <div className="HomePage__button">
        <button
          onClick={() => {
            window.location.href = '/auth/login';
          }}
        >
          Let's do the job!
        </button>
      </div>
    </div>
  );
};

export default HomePage;
