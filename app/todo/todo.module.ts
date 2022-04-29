import Module from "@app/services/utils/decorators/modules.decorator";
import TodoController from "./todo.controller";


@Module({
    controllers: [TodoController],
})
export default class TodoModule {}