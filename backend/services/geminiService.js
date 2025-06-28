const axios = require('axios');
const { apiKey, apiUrl } = require('../config/gemini');
const { getLangue } = require('../routes/langueRoutes');

exports.sendToGemini = async (base64Image, langue) => {
    const selectedLangue = langue || getLangue();
    const buildPrompt = (langue) => {
        const prompts = {
            fr: `Décris cette œuvre d'art dans la langue française sous ce format, et réponds de manière directe et informative, sans utiliser d'introduction comme “Bien sûr”, “Absolument”, ou toute autre formule de politesse. Commence directement par le contenu attendu :
Titre : [titre complet de l'œuvre]
Artiste : [nom de l'artiste]
Date : [date de création]
Courant artistique : [nom du courant artistique]
Matériaux et technique : [matériaux et technique utilisée]
Description : [éléments visuels et symboliques]
Contexte : [contexte historique ou culturel de l'œuvre]
Anecdotes : [anecdotes ou faits intéressants sur l'œuvre]
Importance : [importance de l'œuvre dans l'histoire de l'art ou la culture]
N'hésite pas à développer le contexte, l'importance de l'œuvre et les anecdotes.
Dans cette forme et rien d'autre !
Si aucune œuvre d'art n'est détectée, réponds simplement "Aucune œuvre d'art détectée".
Si l'image est floue ou illisible, réponds "Image floue ou illisible".`,

            en: `Describe this artwork in English using the following format. Respond in a direct and informative way, without using introductions such as “Sure”, “Absolutely”, or any polite expressions. Start directly with the expected content:
Title: [full title of the artwork]
Artist: [name of the artist]
Date: [date of creation]
Art Movement: [name of the artistic movement]
Materials and Technique: [materials and techniques used]
Description: [visual and symbolic elements]
Context: [historical or cultural context of the artwork]
Anecdotes: [interesting facts or stories about the artwork]
Importance: [importance of the artwork in art history or culture]
Feel free to elaborate on the context, importance, and anecdotes.
Use this structure only.
If no artwork is detected, answer: "No artwork detected".
If the image is blurry or unreadable, answer: "Blurry or unreadable image".`,

            es: `Describe esta obra de arte en español utilizando el siguiente formato. Responde de forma directa e informativa, sin usar introducciones como "Por supuesto", "Claro" ni fórmulas de cortesía. Comienza directamente con el contenido esperado:
Título: [título completo de la obra]
Artista: [nombre del artista]
Fecha: [fecha de creación]
Movimiento artístico: [nombre del movimiento artístico]
Materiales y técnica: [materiales y técnicas utilizadas]
Descripción: [elementos visuales y simbólicos]
Contexto: [contexto histórico o cultural de la obra]
Anécdotas: [hechos o historias interesantes sobre la obra]
Importancia: [importancia de la obra en la historia del arte o la cultura]
Puedes desarrollar el contexto, la importancia y las anécdotas.
Solo utiliza este formato.
Si no se detecta ninguna obra, responde: "Ninguna obra de arte detectada".
Si la imagen está borrosa o ilegible, responde: "Imagen borrosa o ilegible".`,

            pt: `Descreva esta obra de arte em português utilizando o seguinte formato. Responda de forma direta e informativa, sem introduções como "Claro", "Com certeza" ou expressões de cortesia. Comece diretamente com o conteúdo esperado:
Título: [título completo da obra]
Artista: [nome do artista]
Data: [data de criação]
Movimento artístico: [nome do movimento artístico]
Materiais e técnica: [materiais e técnicas utilizadas]
Descrição: [elementos visuais e simbólicos]
Contexto: [contexto histórico ou cultural da obra]
Curiosidades: [curiosidades ou fatos interessantes sobre a obra]
Importância: [importância da obra na história da arte ou cultura]
Sinta-se à vontade para desenvolver o contexto, a importância e as curiosidades.
Use apenas este formato.
Se nenhuma obra de arte for detectada, responda: "Nenhuma obra de arte detectada".
Se a imagem estiver borrada ou ilegível, responda: "Imagem borrada ou ilegível".`,

            de: `Beschreibe dieses Kunstwerk auf Deutsch im folgenden Format. Antworte direkt und informativ, ohne Einleitungen wie „Natürlich“, „Selbstverständlich“ oder Höflichkeitsfloskeln. Beginne direkt mit dem erwarteten Inhalt:
Titel: [vollständiger Titel des Werks]
Künstler: [Name des Künstlers]
Datum: [Entstehungsdatum]
Kunstrichtung: [Name der Kunstrichtung]
Materialien und Technik: [verwendete Materialien und Techniken]
Beschreibung: [visuelle und symbolische Elemente]
Kontext: [historischer oder kultureller Kontext des Werks]
Anekdoten: [interessante Fakten oder Geschichten zum Werk]
Bedeutung: [Bedeutung des Werks in der Kunstgeschichte oder Kultur]
Du kannst den Kontext, die Bedeutung und die Anekdoten ausführlich beschreiben.
Nutze ausschließlich dieses Format.
Wenn kein Kunstwerk erkannt wird, antworte: "Kein Kunstwerk erkannt".
Wenn das Bild verschwommen oder unleserlich ist, antworte: "Verschwommenes oder unleserliches Bild".`,

            ko: `이 예술 작품을 한국어로 다음 형식에 따라 설명하세요. "물론입니다", "확실합니다" 등의 정중한 표현 없이 직접적이고 정보 중심으로 답변하세요:
제목: [작품의 전체 제목]
예술가: [작가 이름]
날짜: [제작 연도]
예술 사조: [예술 사조의 이름]
재료 및 기법: [사용된 재료 및 기법]
설명: [시각적 및 상징적 요소]
배경: [작품의 역사적 또는 문화적 배경]
일화: [작품과 관련된 흥미로운 사실 또는 이야기]
중요성: [예술사 또는 문화에서의 중요성]
배경, 중요성, 일화를 자유롭게 자세히 설명하세요.
이 형식만 사용하세요.
작품이 감지되지 않으면 "작품이 감지되지 않았습니다"라고 답하세요.
이미지가 흐리거나 판독할 수 없는 경우 "흐리거나 판독할 수 없는 이미지"라고 답하세요.`,

            zh: `请用中文按照以下格式描述此艺术品。回答要直接且富有信息性，不要使用“当然”、“没问题”等礼貌开场语。直接从内容开始：
标题：[艺术品完整标题]
艺术家：[艺术家姓名]
日期：[创作日期]
艺术流派：[所属艺术流派]
材料与技法：[使用的材料与技法]
描述：[视觉与象征元素]
背景：[艺术品的历史或文化背景]
趣闻：[与艺术品有关的趣闻或有趣的事实]
重要性：[该艺术品在艺术史或文化中的重要性]
请尽可能详细描述背景、重要性和趣闻。
仅使用此格式。
如果未识别出艺术品，请回答：“未识别出艺术品”。
如果图像模糊或无法识别，请回答：“图像模糊或无法识别”。`,

            ru: `Опишите это произведение искусства на русском языке, используя следующий формат. Отвечайте прямо и информативно, без вступлений типа «Конечно», «Разумеется» и других вежливых фраз. Начните сразу с основного содержания:
Название: [полное название произведения]
Художник: [имя художника]
Дата: [дата создания]
Художественное направление: [название направления]
Материалы и техника: [использованные материалы и техника]
Описание: [визуальные и символические элементы]
Контекст: [исторический или культурный контекст]
Факты: [интересные факты или истории о произведении]
Значение: [значение произведения в истории искусства или культуры]
Не стесняйтесь подробно описывать контекст, значение и интересные факты.
Используйте только этот формат.
Если произведение не распознано, ответьте: "Произведение искусства не распознано".
Если изображение размыто или нечитаемо, ответьте: "Размытое или нечитаемое изображение".`
        };

        return prompts[langue] || prompts['en'];
    };


    const prompt = buildPrompt(selectedLangue);
    const body = {
        contents: [{
            parts: [
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: base64Image
                    }
                },
                {
                    text: prompt
                }
            ]
        }]
    };

    const response = await axios.post(apiUrl, body, {
        params: { key: apiKey },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const description = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return description || "Pas de réponse générée.";
};
