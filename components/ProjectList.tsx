import { urlFor } from "@lib/sanity";
import styled from 'styled-components';

import { Box } from "./box";
import Image from 'next/image';
import ProjectListImages from "./ProjectListImages";
import { StyledIcon } from "./ProjectListImages";

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  opacity: 0;
  transition: opacity 250ms ease-in-out;

  @media only screen and (max-width: 768px) {
    position: relative;
    height: auto;
    opacity: 1;
    padding-top: 8px;
  }
`;

const StyledCard = styled.div`
  position: relative;
  ${StyledIcon} {
    opacity: 0;
    transition: opacity 250ms ease-in-out;
  }
  img {
    transition: filter 250ms ease-in-out;
  }
  &:hover img {
    filter: brightness(0.4) contrast(1.05) saturate(0.8) !important;
    transition: filter 250ms ease-in-out;
  }
  &:hover ${StyledOverlay} {
    opacity: 1;
    transition: opacity 250ms ease-in-out;
  }
  &:hover ${StyledIcon} {
    opacity: 1;
    transition: opacity 250ms ease-in-out;
  }
`;

const ProjectList = ({ projects }) => {
  return (
    <Box display="grid" gridGap={["48px", null, "32px"]} gridTemplateColumns={["repeat(1, 1fr)", null, "repeat(3, 1fr)"]} py={["48px", null, "100px"]}>
      {projects.map(project => {
        const url = urlFor(project.images[0].image).auto('format').url();
        const lqip = project.images[0].metadata.lqip;
        return (
          <Box key={project._id} as="a" cursor="pointer" href={`/project/${project.slug.current}`}>
            <StyledCard>
              <Box width="100%" height="0" pb="70%" position="relative" bg="#222">
                <ProjectListImages images={project.images} />
              </Box>
              <StyledOverlay>
                <Box textAlign="center" display={["flex", null, "block"]} justifyContent="space-between" width="100%">
                  <Box fontSize={["16px", null, "32px"]} fontWeight={["400", null, "300"]}>{project.title}</Box>
                  <Box opacity={["0.6", null, "1"]} fontSize="16px" pt={["0", null, "8px"]} fontFamily={["inherit", null, "SangBleu Republic Trial"]} fontStyle={["regular", null, "italic"]}>{project.location}</Box>
                </Box>
              </StyledOverlay>
            </StyledCard>
          </Box>
        )
      })}
    </Box>
  )
}

export default ProjectList;