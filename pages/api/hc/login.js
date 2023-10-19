import HandCashService from "../../../src/services/HandCashService";

export default async (req, res) => {
    const redirectionUrl = new HandCashService().getRedirectionUrl();
    res.status(200).json({ redirectionUrl });
};