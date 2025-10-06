import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollAnimation = () => {
  const containerRef = useRef(null);

  // Section refs
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  // Scroll progress for each section
  const { scrollYProgress: progress1 } = useScroll({
    target: section1Ref,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: progress2 } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: progress3 } = useScroll({
    target: section3Ref,
    offset: ["start end", "end start"],
  });

  // Animations for each section
  const y1 = useTransform(progress1, [0, 1], [100, 0]);
  const opacity1 = useTransform(progress1, [0, 1], [0, 1]);
  const scale1 = useTransform(progress1, [0, 1], [0.8, 1]);

  const y2 = useTransform(progress2, [0, 1], [100, 0]);
  const opacity2 = useTransform(progress2, [0, 1], [0, 1]);
  const scale2 = useTransform(progress2, [0, 1], [0.8, 1]);

  const y3 = useTransform(progress3, [0, 1], [100, 0]);
  const opacity3 = useTransform(progress3, [0, 1], [0, 1]);
  const scale3 = useTransform(progress3, [0, 1], [0.8, 1]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Section 1 */}
      <motion.div
        ref={section1Ref}
        className="h-screen flex items-center justify-center bg-blue-300"
        style={{ y: y1, opacity: opacity1, scale: scale1 }}
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-blue-700">
            Welcome to the Journey
          </h2>
          <p className="mt-4 text-gray-600">
            Scroll down to see more animations.
          </p>
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        ref={section2Ref}
        className="h-screen flex items-center justify-center bg-green-300"
        style={{ y: y2, opacity: opacity2, scale: scale2 }}
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-green-700">
            Amazing Scrolling Effects
          </h2>
          <p className="mt-4 text-gray-600">
            Feel the scroll-based animations come to life.
          </p>
        </div>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        ref={section3Ref}
        className="h-screen flex items-center justify-center bg-purple-300"
        style={{ y: y3, opacity: opacity3, scale: scale3 }}
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-purple-700">
            Enjoy the Scroll
          </h2>
          <p className="mt-4 text-gray-600">
            More to discover as you continue scrolling.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollAnimation;
