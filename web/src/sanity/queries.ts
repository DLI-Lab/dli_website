import { defineQuery } from "next-sanity";

export const publicationsQuery = defineQuery(`
  *[_type == "publication"] | order(year desc, order asc) {
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

export const blogsQuery = defineQuery(`
  *[_type == "blog" && defined(slug.current) && hidden != true] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category,
    readingTime,
    authorRef->{
      _id,
      name,
      role,
      "handle": email,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    hideAuthorProfileImage,
    authorAvatarOverride {
      asset->{
        _id,
        url
      }
    },
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      caption
    },
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    }
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
    github,
    personalPage,
    linkedin,
    weebly,
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

export const blogBySlugQuery = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category,
    readingTime,
    authorRef->{
      _id,
      name,
      role,
      "handle": email,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    hideAuthorProfileImage,
    authorAvatarOverride {
      asset->{
        _id,
        url
      }
    },
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      caption
    },
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    }
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
