// src/features/news/components/NewsCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, CardFooter, CardHeader } from "@heroui/react";
import { Flex } from "antd";
import SVG_New from "@/assets/icons/new";
import NewFooter from "./NewFooter";
import SVG_Options from "@/assets/icons/options";
import { NewPost } from "@/domain/entity/NewPost";
//import { NewPost_to_TNewDetail } from "@/domain/dto/news/new";

type Props = {
  post: NewPost;
  className?: string;
};

export const NewsCard: React.FC<Props> = ({ post, className }) => {
  return <NewCard2 post={post} className={className} />;
};

const NewCard2: React.FC<Props> = ({ post, className }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/new" + "?id=" + post.id);
  return (
    <Card className={" " + className} style={{maxWidth: "700px"}} isPressable onPress={handleClick}>
      <CardHeader className="flex items-center gap-2 justify-between">
        <Flex gap={5} align="center">
          <div>
            <Avatar name={post.source.name} src={post.source.logoUrl} />
          </div>
          <h3 className="font-semibold">{post.source.name}</h3>
          <span>&#183;</span>
          <span className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </Flex>
        <Button isIconOnly color="primary" radius="full" variant="light">
          <SVG_Options />
        </Button>
      </CardHeader>
      <img
        className="w-full object-cover"
        src={post.mainImageUrl}
        alt={post.tittle}
        style={{ height: "300px" }}
      />
      <Flex vertical className="p-3" align="start" justify="start">
        <Flex gap={5} align="center" justify="start" className="w-full">
          <SVG_New />
          <span className="text-sm" style={{ color: "gray", overflow: "hidden", textAlign: "start", textOverflow: "ellipsis" }}>
            {post.link}
          </span>
        </Flex>
        <h3 className="font-semibold" style={{textAlign: "start"}}>{post.tittle}</h3>
      </Flex>
      <CardFooter>
        <NewFooter />
      </CardFooter>
    </Card>
  );
};

/**
<article
      onClick={handleClick}
      className="cursor-pointer border rounded-md shadow-sm overflow-hidden bg-white hover:shadow-md transition"
    >
      <div style={{position: "relative", height: "200px", width: "100%", aspectRatio: "4/3"}}>
        <img
        src={post.mainImageUrl}
        alt={post.title}
        className="w-full object-cover"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </article>
 */
