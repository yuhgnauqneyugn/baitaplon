 const contactForm =
            document.getElementById("contactForm");
        const formMessage =
            document.getElementById("formMessage");
        contactForm.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();
                formMessage.style.display = "block";
                contactForm.reset();
                setTimeout(function () {
                    formMessage.style.display = "none";
                }, 5000);
            }
        );