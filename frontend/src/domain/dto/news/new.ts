import { NewPost, NewPostApi, NewsAuthor, /* TNewDetail */ } from "@/domain/entity/NewPost";
import { ENewsSource } from "@/domain/enum/news/source";
import { NEWS_SOURCES } from "@/domain/data/new.source";
import { NewSource } from "@/domain/entity/NewSource";
export function List_NewPostApi_to_NewPost(
    News: NewPostApi[],
): NewPost[] {
    return News.map((news) => NewPostApi_to_NewPost(news));
}

export function NewPostApi_to_NewPost(new_api: NewPostApi): NewPost {
    const source = detectSource_from_Link(new_api.link);

    if (!source) {
        throw new Error("Source not found");
    }
    return {
        id: new_api.id,
        tittle: new_api.titulo,
        person_author: GetAutorBySource(source, new_api),
        mainImageUrl: new_api.imagenPrincipal,
        date: format_date(new_api.fecha),
        link: new_api.link,
        content_file_name: new_api.contenido,
        source: ESource_to_NewSource(source),
    }
}

export function detectSource_from_Link(link: string): ENewsSource | null {

    const sources = Object.values(ENewsSource);
    const matchedSource = sources.find((sourceDomain) => link.includes(sourceDomain));
    return matchedSource ?? null
    
}

export function ESource_to_NewSource(source: ENewsSource): NewSource {
    return {
        id: source,
        name: NEWS_SOURCES[source].name,
        logoUrl: NEWS_SOURCES[source].logoUrl,
        link: NEWS_SOURCES[source].link,
        has_author: NEWS_SOURCES[source].has_author,
    }
}


export function GetAutorBySource(source: ENewsSource, post_api: NewPostApi): NewsAuthor | null {
    const newSource = NEWS_SOURCES[source];
    if (newSource.has_author) {
        return {
            id: crypto.randomUUID(),
            name: post_api.autor,
        }
    } else {
        return null
    }
}


export function format_date(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${year}/${month}/${day}`;
}