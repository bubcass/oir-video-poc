// src/shortsData.js

const BASE = import.meta.env.BASE_URL || "/";

export const shortsData = [
  {
    id: "clip-1",
    tag: "Inside Parliament",
    headline: "Dáil Éireann",
    info: "Leaders' Questions",
    duration: "3 min · 20 November",
    poster: `${BASE}posters/short-1.jpg`,
    src:    `${BASE}video/short-1.mp4`
  },
   {
    id: "clip-6",
    tag: "Parliamentary Budget Office",
    headline: "Why housing completions matter",
    duration: "4 min",
    poster: `${BASE}posters/fundingMap.png`,
    src:    `${BASE}video/rolePBO.mp4`
  },
  {
    id: "clip-2",
    tag: "Inside Parliament",
    headline: "Seanad Éireann",
    info: "Highlights",
    duration: "5 min · 20 November",
    poster: `${BASE}posters/sean11.jpg`,
    src:    `${BASE}video/short-2.mp4`
  },
  {
    id: "clip-3",
    tag: "Learning Hub",
    headline: "How a Bill becomes an Act",
    duration: "4 min",
    poster: `${BASE}posters/short-3.png`,
    src:    `${BASE}video/bills.mp4`
  },
  {
    id: "clip-7",
    tag: "Report",
    headline: "Review of DEIS school programmes",
    duration: "3 min · 19 November",
    poster: `${BASE}posters/short-14.jpg`,
    src:    `${BASE}video/pac100.mp4`
  },
  {
    id: "clip-44",
    tag: "A day in the life",
    headline: "Debates Office",
    duration: "7 min",
    poster: `${BASE}posters/day.jpg`,
    src:    `${BASE}video/ATH.mp4`
  },
  {
    id: "clip-4",
    tag: "Learning Hub",
    headline: "What is Leaders’ Questions?",
    duration: "5 min",
    poster: `${BASE}posters/short-4.jpg`,
    src:    `${BASE}video/future.mp4`
  },
  {
    id: "clip-5",
    tag: "Parliamentary Research Service",
    headline: "Breaking down Budget 2026",
    duration: "5 min",
    poster: `${BASE}posters/short-5.png`,
    src:    `${BASE}video/pbo.mp4`
  },
  {
    id: "clip-8",
    tag: "Learning Hub",
    headline: "Get to know Oireachtas Committees",
    duration: "4 min",
    poster: `${BASE}posters/committee-meeting.png`,
    src:    `${BASE}video/short-13.mp4`
  },
  {
    id: "clip-9",
    tag: "Inside Parliament",
    headline: "Committee of Public Accounts",
    info: "Highlights",
    duration: "3 min · 19 November",
    poster: `${BASE}posters/short-24.jpg`,
    src:    `${BASE}video/PAC_meet.mp4`
  }
];