import {
  Box,
  Button,
  Grid,
  Heading,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

import ProjectDetailWrapper from "components/projects/ProjectDetailWrapper";
import { getSortedProjectsData } from "helpers/projects";
import { sznmOgImage } from "helpers/sznmOgImage";
import { ProjectType } from "models/project";

type OtherProjectsProps = {
  allProjectsData: Array<ProjectType>;
};

const OtherProjects = ({ allProjectsData }: OtherProjectsProps) => {
  const buttonColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box>
      <NextSeo
        title="Projects - Other"
        openGraph={{
          title: "Projects | sozonome",
          images: [
            {
              url: sznmOgImage("Projects"),
              alt: "Other Projects | sozonome og-image",
            },
          ],
        }}
      />

      <Link href="/projects" passHref>
        <Button
          leftIcon={<AiOutlineArrowLeft />}
          size="sm"
          backgroundColor={buttonColor}
          marginBottom={22}
        >
          projects
        </Button>
      </Link>
      <Box marginBottom={22}>
        <Heading as="h1" size="xl" marginBottom={2}>
          Other Projects
        </Heading>
      </Box>
      <Grid
        gap={8}
        templateColumns={["repeat(1)", "repeat(1)", "repeat(2, 1fr)"]}
      >
        {/* Other Projects */}
        {allProjectsData
          .filter(
            (project) =>
              !project.featured && project.published !== false && project
          )
          .map((projectData) => {
            if (projectData.projectLink || projectData.repoLink) {
              return (
                <ChakraLink
                  href={projectData.projectLink || projectData.repoLink}
                  isExternal
                  key={projectData.id}
                >
                  <ProjectDetailWrapper projectData={projectData} />
                </ChakraLink>
              );
            }
            return (
              <ProjectDetailWrapper
                projectData={projectData}
                key={projectData.id}
              />
            );
          })}
      </Grid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<OtherProjectsProps> = async () => {
  const allProjectsData = getSortedProjectsData();
  return {
    props: {
      allProjectsData,
    },
  };
};

export default OtherProjects;
