import { defineQuery } from "next-sanity";

export const publicationsQuery = defineQuery(`
  *[_type == "publication"] | order(year desc, venue asc) {
    _id,
    year,
    title,
    venue,
    authors,
    tags,
    image,
    paperUrl,
    codeUrl,
    highlight,
    presentationType
  }
`);

export const galleriesQuery = defineQuery(`
  *[_type == "gallery"] | order(date desc) {
    _id,
    title,
    date,
    tag,
    info,
    location,
    images[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    videos[] {
      asset->{
        _id,
        url,
        mimeType,
        size
      }
    }
  }
`);

export const membersQuery = defineQuery(`
  *[_type == "member"] | order(category asc, order asc, name asc) {
    _id,
    name,
    role,
    category,
    email,
    image {
      asset->{
        _id,
        url
      }
    },
    bio,
    website,
    googleScholar
  }
`);

export const researchAreasQuery = defineQuery(`
  *[_type == "researchArea"] | order(order asc) {
    _id,
    title,
    image {
      asset->{
        _id,
        url
      }
    },
    tasks
  }
`);

export const newsQuery = defineQuery(`
  *[_type == "news"] | order(date desc) {
    _id,
    date,
    category,
    summary,
    description,
    image {
      asset->{
        _id,
        url
      }
    },
    link,
    paperTitle,
    authors,
    venue,
    note,
    paperUrl,
    codeUrl,
    datasetUrl,
    papers[] {
      title,
      authors,
      venue,
      note,
      paperUrl,
      codeUrl,
      datasetUrl
    }
  }
`);
