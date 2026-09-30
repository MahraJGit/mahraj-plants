export type BlogFaq = {
    question: string;
    answer: string;
};

const MAX_FAQS = 20;
const MAX_QUESTION = 200;
const MAX_ANSWER = 1000;

export function normalizeFaqs(value: unknown): BlogFaq[] {
    if (!Array.isArray(value)) return [];

    return value
        .map((item) => {
            if (!item || typeof item !== "object") {
                return { question: "", answer: "" };
            }
            const row = item as Record<string, unknown>;
            return {
                question:
                    typeof row.question === "string" ? row.question.trim() : "",
                answer: typeof row.answer === "string" ? row.answer.trim() : "",
            };
        })
        .filter((faq) => faq.question.length > 0 && faq.answer.length > 0)
        .slice(0, MAX_FAQS);
}

export function createEmptyFaq(): BlogFaq {
    return { question: "", answer: "" };
}

export function validateFaqs(faqs: BlogFaq[]): Record<string, string> {
    const errors: Record<string, string> = {};

    if (faqs.length > MAX_FAQS) {
        errors.faqs = `You can add up to ${MAX_FAQS} FAQs.`;
        return errors;
    }

    faqs.forEach((faq, index) => {
        const question = faq.question.trim();
        const answer = faq.answer.trim();
        const hasQuestion = question.length > 0;
        const hasAnswer = answer.length > 0;

        if (!hasQuestion && !hasAnswer) return;

        if (!hasQuestion) {
            errors[`faqs.${index}.question`] = "Add a question.";
        } else if (question.length > MAX_QUESTION) {
            errors[`faqs.${index}.question`] =
                `Keep questions under ${MAX_QUESTION} characters.`;
        }

        if (!hasAnswer) {
            errors[`faqs.${index}.answer`] = "Add an answer.";
        } else if (answer.length > MAX_ANSWER) {
            errors[`faqs.${index}.answer`] =
                `Keep answers under ${MAX_ANSWER} characters.`;
        }
    });

    return errors;
}

export { MAX_FAQS, MAX_QUESTION, MAX_ANSWER };
