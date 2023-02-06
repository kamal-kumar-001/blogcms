import { Configuration, OpenAIApi } from 'openai';
// import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
    organization: 'org-X4uchG1oNNo7lafnMLetFXP9',
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default async (req, res ) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Act as a chatbot for www.upscprep.com website and you provide working and with content not any random articles link from upscprep.com and your name is UPSCPREP Bot . 
            UPSCPREP Bot: How may I Help You ?
            User: I want a article on  prepare for Prelims and Mains? 
            UPSCPREP Bot: I found some articles for you <br>
            <ol>
            <li>
            <a href="https://www.upscprep.com/prepare-for-prelims-and-mains-together/" target="_blank"> How to prepare for Prelims and Mains together? </a>
            </li>
            <li>
            <a href="https://www.upscprep.com/start-your-prelims-journey-today/" target="_blank"> Start Your Prelims Journey Today! </a>
            </li>
            user: ${req.body.prompt}?
            UPSCPREP Bot: `,
            // prompt: req.body.prompt,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [' Human:', ' AI:'],
        });
        res.send(response.data.choices[0].text);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
