import styled from "styled-components";
import CardSkeleton from "@/components/Styled/CardSkeleton";
import MealCard from "@/components/MealCard";
import Header from "@/components/Styled/Header";
import StyledUl from "@/components/StyledUl";
import LoadingComponent from "@/components/Loading";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Favorites({
  user,
  error,
  isLoading,
  getRecipeProperty,
  toggleIsFavorite,
}) {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    signIn();
  }

  const favoriteRecipes = user?.recipeInteractions
    .filter((recipe) => recipe.isFavorite)
    .map((recipe) => recipe.recipe);

  if (error) {
    <div>
      <Header text={"Favoriten 🥗"} />
      Error...
    </div>;
  }

  if (isLoading || status === "loading") {
    return (
      <>
        <Header text="Favoriten 🥗" />
        <LoadingComponent amount />
      </>
    );
  }

  return (
    <>
      <Header text="Favoriten 🥗" />
      <StyledArticle>
        <StyledUl>
          {favoriteRecipes?.map((recipe) => {
            return (
              <MealCard
                key={recipe._id}
                recipe={recipe}
                isFavorite={getRecipeProperty(recipe._id, "isFavorite")}
                onToggleIsFavorite={toggleIsFavorite}
              />
            );
          })}
        </StyledUl>
      </StyledArticle>
    </>
  );
}

const StyledArticle = styled.article``;
