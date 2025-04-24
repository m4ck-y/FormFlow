import { NewPost, NewPostApi } from "@/domain/entity/NewPost";
import { ENewsSource } from "@/domain/enum/news/source";
import { NEWS_SOURCES } from "@/domain/data/new.source";
import { randomUUID } from "crypto";
export function NewPostApi_to_NewPost(
    News: NewPostApi[],
    source: ENewsSource
): NewPost[] {
    return News.map((news) => ({
        id: news.id,
        title: news.title,
        author: { id: randomUUID(), name: news.author },
        mainImageUrl: news.imagenPrincipal,
        date: news.fecha,
        link: news.link,
        content_file_name: news.contenido,
        source: {
            id: source,
            name: NEWS_SOURCES[source].name,
            logoUrl: NEWS_SOURCES[source].logoUrl,
            link: NEWS_SOURCES[source].link,
        },
    }));
}
