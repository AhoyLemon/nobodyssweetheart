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
      // Eye tracking functionality
      // Adjust this value to control pupil sensitivity (higher = less sensitive, needs more distance to reach edge)
      const pupilSensitivity = 22;

      const leftPupil = document.getElementById("leftPupil");
      const rightPupil = document.getElementById("rightPupil");
      const leftEyeball = document.querySelector(".eyeball.left");
      const rightEyeball = document.querySelector(".eyeball.right");

      if (leftPupil && rightPupil && leftEyeball && rightEyeball) {
        document.addEventListener("mousemove", (e) => {
          // Update left eye
          updatePupilPosition(leftEyeball, leftPupil, e.clientX, e.clientY);
          // Update right eye
          updatePupilPosition(rightEyeball, rightPupil, e.clientX, e.clientY);
        });
      }

      function updatePupilPosition(eyeball, pupil, mouseX, mouseY) {
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
        const pupilDistance = Math.min(
          distance / pupilSensitivity,
          maxDistance,
        );

        // Calculate pupil position relative to eyeball center
        const pupilX = Math.cos(angle) * pupilDistance;
        const pupilY = Math.sin(angle) * pupilDistance;

        // Apply transform to move pupil
        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      }
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
