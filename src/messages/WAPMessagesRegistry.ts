import Message from "@wayward/game/language/dictionary/Message";
import Register from "@wayward/game/mod/ModRegistry";

export default class WAPMessagesRegistry {

    @Register.message("MsgAnemometerCheckWind")
	public readonly MsgAnemometerCheckWind: Message;

    @Register.message("MsgAnemometerCheckWindAdvanced")
    public readonly MsgAnemometerCheckWindAdvanced: Message;

}