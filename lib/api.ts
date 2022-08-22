import { groq } from 'next-sanity';
import { sanityClient } from '@lib/sanity';

export async function getHomePage() {
    const query = groq`
        *[_type == "homePage"][0] {
            title,
            "projects": *[_type == "project"] {
                ...
            }
        }
    `

    const data = await sanityClient.fetch(query);
    
    return {
        data,
        query
    }
}

export async function getProject(slug: string) {
    const query = groq`
        *[_type == "project" && slug.current match '${slug}'][0] {
            slug,
            title,
            description,
            images[] {
                ...
            },
            location,
            clientType,
            scope,
            services
        }
    `

    const data = await sanityClient.fetch(query);
    
    return {
        data,
        query
    }
}

export async function getProjectPaths() {
    const query = groq`
          *[_type == "project" && defined(slug)] {
              "params": { "slug": slug.current }
          }
      `;
  
    const data = await sanityClient.fetch(query);
  
    return {
      data,
      query
    };
  }
