export interface CountryConfigType {
  state: string;
  stateCode: string;
}

const india: CountryConfigType[] = [
  { state: "Andhra Pradesh", stateCode: "AP" },
  { state: "Arunachal Pradesh", stateCode: "AR" },
  { state: "Assam", stateCode: "AS" },
  { state: "Bihar", stateCode: "BR" },
  { state: "Chhattisgarh", stateCode: "CG" },
  { state: "Goa", stateCode: "GA" },
  { state: "Gujarat", stateCode: "GJ" },
  { state: "Haryana", stateCode: "HR" },
  { state: "Himachal Pradesh", stateCode: "HP" },
  { state: "Jharkhand", stateCode: "JH" },
  { state: "Karnataka", stateCode: "KA" },
  { state: "Kerala", stateCode: "KL" },
  { state: "Madhya Pradesh", stateCode: "MP" },
  { state: "Maharashtra", stateCode: "MH" },
  { state: "Manipur", stateCode: "MN" },
  { state: "Meghalaya", stateCode: "ML" },
  { state: "Mizoram", stateCode: "MZ" },
  { state: "Nagaland", stateCode: "NL" },
  { state: "Odisha", stateCode: "OR" },
  { state: "Punjab", stateCode: "PB" },
  { state: "Rajasthan", stateCode: "RJ" },
  { state: "Sikkim", stateCode: "SK" },
  { state: "Tamil Nadu", stateCode: "TN" },
  { state: "Telangana", stateCode: "TG" },
  { state: "Tripura", stateCode: "TR" },
  { state: "Uttar Pradesh", stateCode: "UP" },
  { state: "Uttarakhand", stateCode: "UK" },
  { state: "West Bengal", stateCode: "WB" },
];

export const countries = [
  {
    name: "India",
    code: "IN",
  },
  {
    name: "Dubai",
    code: "AE",
  },
];

export const checkCountries = (codes: string[]) => {
  const validStateCodes = new Set(countries.map((each) => each.code));
  return codes?.every((code) => validStateCodes.has(code));
};

export const getStateByCountryCode = (code: "IN" | "AE") => {
  if (code === "IN") {
    return india.map((each) => ({
      state: each.state,
      stateCode: each.stateCode,
    }));
  }
};

export const checkStateByCountryCode = (
  code: "IN" | "AE",
  stateCode: string
) => {
  if (code === "IN") {
    return india.some((each) => each?.stateCode === stateCode);
  }
};

export const checkStatesByCountryCode = (
  countries: string[],
  stateCodes: string[]
) => {
  let states: CountryConfigType[] = [];
  if (countries.includes("IN")) {
    states = [...states, ...india];
  }
  // TODO: Need to add AE configs
  const validStateCodes = new Set(states?.map((each) => each.stateCode));
  return stateCodes?.every((code) => validStateCodes.has(code));
};
