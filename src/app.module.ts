import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        // 'mongodb+srv://s0548503880:sa3880@syte.tf0xf.mongodb.net/Syte?retryWrites=true&w=majority&appName=Syte',
        'mongodb://localhost:27017/syte-db',
    ),
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
