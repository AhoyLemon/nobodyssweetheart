const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      h1: "It works!",
      h5: "Whenever you're ready, delete this text and start writing code.",
    };
  },
  methods: {
    moveThosePupils() {
      const leftEyeball = document.getElementById("LeftEyeball");
      const rightEyeball = document.getElementById("RightEyeball");
      const leftPupil = document.getElementById("LeftPupil");
      const rightPupil = document.getElementById("RightPupil");

      if (!leftPupil || !rightPupil || !leftEyeball || !rightEyeball) return;

      // Check if we're on the 404 page
      const is404Page = document.querySelector("main.error-404") !== null;

      if (is404Page) {
        // Update the H2 text with the page slug
        const h2Element = document.querySelector("main.error-404 h2");
        if (h2Element) {
          const pageSlug = window.location.pathname;
          h2Element.textContent = `${pageSlug} doesn't exist.`;
        }
        // CSS handles the animation now
        return;
      } else {
        // Normal cursor tracking for other pages
        const pupilSensitivity = 22;
        document.addEventListener("mousemove", (e) => {
          this.updatePupilPosition(
            leftEyeball,
            leftPupil,
            e.clientX,
            e.clientY,
            pupilSensitivity,
          );
          this.updatePupilPosition(
            rightEyeball,
            rightPupil,
            e.clientX,
            e.clientY,
            pupilSensitivity,
          );
        });
      }
    },
    animateParanoidEyes(leftEyeball, leftPupil, rightEyeball, rightPupil) {
      const moveEye = (eyeball, pupil) => {
        const eyeballRect = eyeball.getBoundingClientRect();
        const eyeballRadius = eyeballRect.width / 2;
        const pupilRect = pupil.getBoundingClientRect();
        const pupilRadius = pupilRect.width / 2;
        const maxDistance = eyeballRadius - pupilRadius;

        // Random angle and distance - favor more extreme positions for paranoid effect
        const angle = Math.random() * Math.PI * 2;
        const distance = (0.5 + Math.random() * 0.5) * maxDistance; // 50-100% of max distance

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      };

      // Continuously move eyes at consistent intervals that match the CSS transition
      const animateLeft = () => {
        moveEye(leftEyeball, leftPupil);
        setTimeout(animateLeft, 350); // 800-1200ms to match CSS transition
      };

      const animateRight = () => {
        moveEye(rightEyeball, rightPupil);
        setTimeout(animateRight, 535);
      };

      // Start with slight delay between eyes for more natural paranoid effect
      animateLeft();
      setTimeout(() => animateRight(), 400);
    },
    updatePupilPosition(eyeball, pupil, mouseX, mouseY, pupilSensitivity) {
      // Get eyeball position and dimensions
      const eyeballRect = eyeball.getBoundingClientRect();
      const eyeballCenterX = eyeballRect.left + eyeballRect.width / 2;
      const eyeballCenterY = eyeballRect.top + eyeballRect.height / 2;

      // Calculate angle from eyeball center to mouse
      const deltaX = mouseX - eyeballCenterX;
      const deltaY = mouseY - eyeballCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Calculate distance from eyeball center to mouse
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // The eyeball radius (half of its width)
      const eyeballRadius = eyeballRect.width / 2;

      // Get pupil dimensions
      const pupilRect = pupil.getBoundingClientRect();
      const pupilRadius = pupilRect.width / 2;

      // Maximum distance the pupil can move (eyeball radius minus pupil radius)
      const maxDistance = eyeballRadius - pupilRadius;

      // Constrain the pupil movement
      // If mouse is closer, pupil moves proportionally; if far, stays at edge
      const pupilDistance = Math.min(distance / pupilSensitivity, maxDistance);

      // Calculate pupil position relative to eyeball center
      const pupilX = Math.cos(angle) * pupilDistance;
      const pupilY = Math.sin(angle) * pupilDistance;

      // Apply transform to move pupil
      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    },
  },
  computed: {
    // ...existing code...
  },
  mounted() {
    this.moveThosePupils();
  },
});

app.mount("#app");
