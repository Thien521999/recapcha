"use client";
// import Image from "next/image";
import styles from "./page.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const [valueReCaptcha, setValueReCaptcha] = useState("");
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);

  const onChange = (value: any) => {
    console.log("value", value);
    setValueReCaptcha(value);
  };

  // const handleClick = async (formData: any) => {
  //   // const token = await recaptchaRef.current.executeAsync();
  //   // console.log("token", token);
  //   try {
  //     // if (executeRecaptcha) {
  //     //   const token = await executeRecaptcha(formType);
  //     //   setIsLoading(true);
  //     //   if (token) {
  //     //     const newFormData = {
  //     //       ...formData,
  //     //       recaptcha: token,
  //     //     };
  //     //     const result = await roomApi.submitCorporate(newFormData, { lang });
  //     //     if (result.data) {
  //     //       router.push(
  //     //         {
  //     //           pathname: ROUTER_PATH?.success,
  //     //           query: {
  //     //             slug,
  //     //           },
  //     //         },
  //     //         undefined,
  //     //         { shallow: true }
  //     //       );
  //     //     }
  //     //     sessionStorage.setItem('slugSuccess', slug);
  //     //   }
  //     // }
  //   } catch (error: any) {
  //     // setError(error?.message);
  //   }
  //   // setIsLoading(false);
  // };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (recaptchaRef.current) {
      try {
        const token = await recaptchaRef.current.executeAsync();
        // apply the token to form data or perform any other actions
        console.log("reCAPTCHA Token:", token);

        const res = await axios({
          method: "post",
          url: `https://csw-hotel-web-p2-cms-dev.legato-concept.com/api/v1/booking/corporate/submit?lang=en`,
          data: {
            argreeTerms: true,
            commencement_date: "2024-01-04",
            corporate_name: "abc",
            discover_by: "option_2",
            email: "a@gmail.com",
            first_name: "a",
            last_name: "b",
            lease_period: "Less than 1 Month",
            monthly_budget_range: "<$20,000",
            number_of_people: 1,
            personal_request: "sasa",
            phone: "12345678",
            phone_country_code: "+84",
            recaptcha: token,
            room_type: ["1 bedroom"],
            wechat: "sasa",
          },
        });

        console.log("res", res);
      } catch (error) {
        console.error("Error executing reCAPTCHA:", error);
      }
    }

    // console.log("valueReCaptcha", valueReCaptcha);
    // console.log("value");
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleOnSubmit}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={onChange}
          size="invisible"
        />
        <button type="submit">Click</button>
      </form>
    </main>
  );
}
