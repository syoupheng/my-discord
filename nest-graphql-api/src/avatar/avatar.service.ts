import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarService {
  static readonly COLORS = ['#45c46d', '#ef4444', '#e6005c', '#ff5c33', '#008ae6', '#3333ff', '#e67300', '#a3a3c2', '#ffdb4d', '#00b386'];

  getColor() {
    return AvatarService.COLORS[Math.floor(Math.random() * AvatarService.COLORS.length)];
  }
}
