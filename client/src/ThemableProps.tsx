export declare interface ThemableProps {
  theme?: Theme;
}

declare interface Theme {
  getText(): string;
  getBackground(): string;
  getButton(): string;
}

const primaryTheme: Theme = {
  getText() {
    const _Classes = 'text-primary';
    return _Classes;
  },
  getBackground() {
    const _Classes = 'bg-secondary';
    return _Classes;
  },
  getButton() {
    const _Classes = 'bg-primary text-white';
    return _Classes;
  }
}
const secondaryTheme: Theme = {
  getText() {
    const _Classes = 'black';
    return _Classes;
  },
  getBackground() {
    const _Classes = 'bg-tertiary';
    return _Classes;
  },
  getButton() {
    const _Classes = 'bg-secondary black';
    return _Classes;
  }
}
const successTheme: Theme = null!;
const dangerTheme: Theme = {
  getText() {
    const _Classes = 'text-red-700';
    return _Classes;
  },
  getBackground() {
    const _Classes = 'bg-red-200';
    return _Classes;
  },
  getButton() {
    const _Classes = 'bg-red-700 text-white';
    return _Classes;
  }
};
const warningTheme: Theme = {
  getText() {
    const _Classes = 'text-amber-700'
    return _Classes;
  },
  getBackground() {
    const _Classes = 'bg-amber-200';
    return _Classes;
  },
  getButton() {
    const _Classes = 'bg-amber-700 text-white';
    return _Classes
  }
};
const infoTheme: Theme = {
  getText() {
    const _Classes = 'text-blue-700';
    return _Classes;
  },
  getBackground() {
    const _Classes = 'bg-blue-200';
    return _Classes;
  },
  getButton() {
    const _Classes = 'bg-blue-700 text-white';
    return _Classes;
  }
};
const navTheme: Theme = {
  getText() {
    return 'text-white !underline hover:!decoration-primary';
  },
  getBackground() {
    return '';
  },
  getButton() { return 'text-white bg-slate-200 bg-opacity-20 hover:bg-opacity-30'; }
}
const noneTheme: Theme = {
  getText() {
    return '';
  },
  getBackground() {
    return '';
  },
  getButton() {
    return '';
  }
}

export default class Themes {
  static readonly Default = primaryTheme;
  static readonly Primary = primaryTheme;
  static readonly Secondary = secondaryTheme;
  static readonly Success = successTheme;
  static readonly Danger = dangerTheme;
  static readonly Warning = warningTheme;
  static readonly Info = infoTheme;
  static readonly Nav = navTheme;
  static readonly None = noneTheme;
  static WithStaticColors(fg: string, bg: string, btn?: string): Theme {
    return {
      getText() { return fg; },
      getBackground() { return bg; },
      getButton() { return btn ?? ''; }
    }
  }
};
