import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class GetListController {
  
  @Get('list')
  getList(): any {
    
    return {
      message: "Here is the list of items",
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ]
    };
  }
}
